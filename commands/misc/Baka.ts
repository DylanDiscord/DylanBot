import {CommandBase, OCommandBuilder} from "../../handlers/CommandBase.js";
import {EmbedBuilder, SlashCommandBuilder, User} from "discord.js";
import {Config, CustomMethods} from "../../exportMain.js";
import {LanguageCodes} from "../../handlers/CustomMethods.js";

export default class Baka extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("baka")
        .setDescription("A quien le vamos a insultar 🤔?")
        .addUserOption((a) => a.setName("usuario").setDescription("usuario a insultar").setRequired(true));

    async run(): Promise<void> {
        
        const user: User = this.context.options.getUser("usuario")!;

        if(user!.id == this.context.user!.id || user.bot) {
            const embedE: EmbedBuilder = new EmbedBuilder()
                .setDescription(`No puedes ${user.bot ? "insultar a un bot" : "insultarte a ti mismo"}`)
                .setColor(Config.colors.errorEmbed);

            await this.context.reply({embeds: [embedE]});
            return;
        }

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`${this.context.user?.tag} le dijo estupido a ${user?.tag}`)
            .setImage((await CustomMethods.getGifsFromTenor({query: "baka", locale: LanguageCodes.Spanish}))[0])
            .setColor(Config.colors.successEmbed);

        await this.context.reply({embeds: [embed]});
    }
}