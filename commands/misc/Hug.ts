import {CommandBase, OCommandBuilder} from "../../handlers/CommandBase.js";
import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import { Config } from "../../exportMain.js";

export default class Banana extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("hug")
        .setDescription("A quien vas a abrazar 🤗?")
        .addUserOption((a) => a.setName("usuario").setDescription("usuario a abrazar").setRequired(true));

    async run(): Promise<void> {
        
        const user = this.context.options.getUser("usuario")
        const embedE: EmbedBuilder = new EmbedBuilder()
        .setDescription("No puedes abrazarte a ti mismo.")
        .setColor(Config.colors.errorEmbed)
        if(user!.id == this.context.user!.id) await this.context.reply({embeds: [embedE]})

        const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle(`${this.context.user?.tag} le dio un abrazo a ${user?.tag}`)
        .setImage("https://media.tenor.com/ncblDAj_2FwAAAAC/abrazo-hug.gif")
        .setColor(Config.colors.successEmbed)

        await this.context.reply({embeds: [embed]});
       
    }
}