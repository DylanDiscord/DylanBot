import {CommandBase, OCommandBuilder} from "../../handlers/CommandBase.js";
import {EmbedBuilder, SlashCommandBuilder, User} from "discord.js";
import {Config, CustomMethods} from "../../exportMain.js";
import {LanguageCodes} from "../../handlers/CustomMethods.js";

export default class Banana extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("hug")
        .setDescription("A quien vas a abrazar 🤗?")
        .addUserOption((a) => a.setName("usuario").setDescription("usuario a abrazar").setRequired(true));

    async run(): Promise<void> {
        
        const user: User = this.context.options.getUser("usuario")!;

        if(user!.id == this.context.user!.id || user.bot) {
            const embedE: EmbedBuilder = new EmbedBuilder()
                .setDescription(`No puedes ${user.bot ? "abrazar a un bot" : "abrazarte a ti mismo"}`)
                .setColor(Config.colors.errorEmbed);

            await this.context.reply({embeds: [embedE]});
            return;
        }

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`${this.context.user?.tag} le dio un abrazo a ${user?.tag}`)
            .setImage((await CustomMethods.getGifsFromTenor({query: "hug", locale: LanguageCodes.Spanish}))[0])
            .setColor(Config.colors.successEmbed);

        await this.context.reply({embeds: [embed]});
    }
}