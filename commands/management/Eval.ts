import { CommandBase, OCommandBuilder } from "../../handlers/CommandBase.js";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { performance } from "node:perf_hooks";
import { inspect } from "node:util";
import typescript from "typescript";
import { Config } from "../../exportMain.js";

export default class Eval extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Evalúa código de JavaScript.")
        .addStringOption(o => o.setName("código").setDescription("El código que evaluar.").setRequired(true));

    async run(): Promise<void> {
        await this.context.deferReply();

        if (!Config.evalUsers.includes(this.context.user.id)) {
            const errorEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("No pareces estar en la lista de usuarios que pueden usar este comando.")
                .setColor(0xff0000);

            await this.context.editReply({embeds: [errorEmbed]});
            return;
        }

        const expression: string | null = this.context.options.getString("código")!;

        try {
            performance.mark("eval-start");

            const resultado: string = inspect(await eval(typescript.transpile(expression)), {depth: 1})
                .replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
                .substring(0, 1000);

            performance.mark("eval-end");

            const successEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle("Evaluación")
                .setColor(Config.colors.successEmbed)
                .addFields(
                    {name: "Expresión", value: `\`\`\`js\n${expression}\`\`\``},
                    {name: "Resultado", value: `\`\`\`${resultado}\`\`\``}
                )
                .setFooter({text: `Evaluado en: ${performance.measure("eval", "eval-start", "eval-end").duration}ms`})
                .setTimestamp(Date.now());

            await this.context.editReply({embeds: [successEmbed]});
        } catch (exception: any) {
            const errorEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle("Evaluación")
                .setColor(Config.colors.errorEmbed)
                .addFields(
                    {name: "Expresión", value: `\`\`\`js\n${expression}\`\`\``},
                    {name: "Resultado", value: `\`\`\`${exception}\`\`\``}
                )
                .setTimestamp(Date.now());

            await this.context.editReply({embeds: [errorEmbed]});
        }
    }
}