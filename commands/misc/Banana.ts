import {CommandBase, OCommandBuilder} from "../../handlers/CommandBase.js";
import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import { Config } from "../../exportMain.js";

export default class Banana extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("banana")
        .setDescription("Te muestra el tamaño de tu banana 🍌.");

    async run(): Promise<void> {
        const bananaEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`${this.context.user.tag} tu banana mide ${Math.floor(Math.random() * 20)}`)
            .setImage("https://us.123rf.com/450wm/imagestore/imagestore1606/imagestore160600725/58020236-pl%C3%A1tano-pelado-en-el-fondo-blanco.jpg")
            .setColor(Config.colors.defaultEmbed);

        await this.context.reply({embeds: [bananaEmbed]});
    }
}