import {CommandBase, OCommandBuilder} from "../../handlers/CommandBase.js";
import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import axios, {AxiosResponse} from "axios";

export default class Trivia extends CommandBase {
    override enabled = false;

    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("trivia")
        .setDescription("Juega una partida de trivia! 🎲")
        .addStringOption(o => o.setName("dificultad").setDescription("Que dificultad jugar?").addChoices({name: "Cualquiera", value: "any"}, {name: "Fácil", value: "easy"}, {name: "Medio", value: "medium"}, {name: "Difícil", value: "hard"}).setRequired(true))
        .addIntegerOption(o => o.setName("numero").setDescription("Cuantas preguntas quieres responder?").setMaxValue(10).setMinValue(3).setRequired(true))

    async run(): Promise<void> {
        await this.context.deferReply();

        const token: AxiosResponse<ITokenResponse> = await axios.get("https://opentdb.com/api_token.php?command=request");

        const errorEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle("Hubo un error")
            .setFooter({text: "Prueba a intentarlo mas tarde"})
            .setTimestamp(Date.now())
            .setColor(0xff0000);

        if(token.data.response_code != 0 || !(token.status < 300 && token.status > 200)) {
            errorEmbed
                .setDescription("Hubo un error al generar un token de session.");

            await this.context.editReply({embeds: [errorEmbed]});
            return;
        }

        const questions: ITriviaResponse | null = await Trivia.getQuestions(token.data.token, this.context.options.getInteger("numero")!, this.context.options.getString("dificultad")!);

        if (questions == null) {
            errorEmbed
                .setDescription("Hubo un error al conseguir las preguntas para este trivia.");

            await this.context.editReply({embeds: [errorEmbed]});
            return;
        }

        const timeLimitUnix: number = Date.now() + 900000;

        for (let i = 0; i < questions.results.length; i++) {
            const question: ITriviaQuestion = questions.results[i];
            await new Promise<void>((resolve): void => {
                const questionEmbed: EmbedBuilder = new EmbedBuilder()
                    .setTitle(`Pregunta ${i}`)
                    .setDescription(`${question.question}\n\n**Dificultad**: \`${question.difficulty}\`\n**Categoría**: \`${question.category}\``);
            });
        }
    }

    static async getQuestions(token: string, amount: number, difficulty: string): Promise<ITriviaResponse | null> {
        const result: AxiosResponse<ITriviaResponse> = await axios.get(`https://opentdb.com/api.php?amount=${amount}&token=${token}${difficulty != "any" ? `&difficulty=${difficulty}` : ""}`);

        if (result.data.response_code == 1 || !(result.status < 300 && result.status > 200))
            return null;

        if (result.data.response_code == 4 || result.data.response_code == 3) {
            const newToken: AxiosResponse<ITokenResponse> = await axios.get("https://opentdb.com/api_token.php?command=request");

            if(newToken.data.response_code != 0 || !(newToken.status < 300 && newToken.status > 200))
                return null;

            return this.getQuestions(newToken.data.token, amount, difficulty);
        }

        return result.data;
    }
}

interface ITokenResponse {
    response_code: number
    response_message: string
    token: string
}

interface ITriviaResponse {
    token: string
    response_code: number
    results: Array<ITriviaQuestion>
}

interface ITriviaQuestion {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: Array<string>
}