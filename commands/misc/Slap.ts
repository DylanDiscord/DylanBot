import {CommandBase, OCommandBuilder} from "../../handlers/CommandBase.js";
import {EmbedBuilder, SlashCommandBuilder, User} from "discord.js";
import {Config, CustomMethods} from "../../exportMain.js";
import {LanguageCodes} from "../../handlers/CustomMethods.js";

export default class Slap extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("slap")
        .setDescription("A quien le vamos a pegar 🤔?")
        .addUserOption((a) => a.setName("usuario").setDescription("usuario a pegar").setRequired(true));

    async run(): Promise<void> {
        
        const user: User = this.context.options.getUser("usuario")!;

        if(user!.id == this.context.user!.id || user.bot) {
            const embedE: EmbedBuilder = new EmbedBuilder()
                .setDescription(`No puedes ${user.bot ? "pegarle a un bot" : "pegarte a ti mismo"}`)
                .setColor(Config.colors.errorEmbed);

            await this.context.reply({embeds: [embedE]});
            return;
        }

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`${this.context.user?.tag} le dio una cachetada a ${user?.tag}`)
            .setImage((await CustomMethods.getGifsFromTenor({query: "slap", locale: LanguageCodes.Spanish}))[0])
            .setColor(Config.colors.successEmbed);

        await this.context.reply({embeds: [embed]});
    }
}