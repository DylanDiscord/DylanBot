import { CommandBase, OCommandBuilder } from "../../handlers/CommandBase.js";
import { EmbedBuilder, GuildEmoji, SlashCommandBuilder } from "discord.js";
import { CustomMethods } from "../../handlers/CustomMethods.js";
import {client, Config} from "../../exportMain.js";

export default class Borracho extends CommandBase {
    public command: OCommandBuilder = new SlashCommandBuilder()
    .setName("borracho")
    .setDescription("Mide tu nivel de alcoholismo 🍻.");
    public async run(): Promise<void> {

        const loadingEmoji: GuildEmoji = client.emojis.cache.get("1042078068354859049")!;

        const cargando: EmbedBuilder = new EmbedBuilder()
            .setDescription(`${loadingEmoji} Midiendo tu nivel de alcoholismo... ${loadingEmoji}`)
            .setColor(Config.colors.defaultEmbed);

        await this.context.reply({embeds: [cargando]});
        await CustomMethods.sleep(Math.floor(Math.random() * 5000));

        const alcoholismo: EmbedBuilder = new EmbedBuilder()
        .setTitle("🍻 Nivel de alcoholismo 🍻")
        .setDescription(`Tu nivel de alcohol es de ${Math.floor(Math.random() * 100)}%`)
        .setImage("https://media.tenor.com/yr-ir7mI9vgAAAAi/chin-chin-cerveza.gif")
        .setColor(Config.colors.defaultEmbed);

        await this.context.editReply({ embeds: [alcoholismo]});
    }
}