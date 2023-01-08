import { CommandBase, OCommandBuilder } from "../handlers/CommandBase.js";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default class Borracho extends CommandBase {
    public command: OCommandBuilder = new SlashCommandBuilder()
    .setName("borracho")
    .setDescription("Mide tu nivel de alcoholismo. 🍻");
    public async run(): Promise<void> {
        let borracho = Math.floor(Math.random() * 100)
        const alcoholismo: EmbedBuilder = new EmbedBuilder()
        .setTitle("🍻Nivel de alcoholismo🍻")
        .setDescription(`Tu nivel de alcohol es de ${borracho}%`)
        .setImage("https://media.tenor.com/yr-ir7mI9vgAAAAi/chin-chin-cerveza.gif")
        .setColor("Aqua")
        this.context.reply({ embeds: [alcoholismo]});
    }

}