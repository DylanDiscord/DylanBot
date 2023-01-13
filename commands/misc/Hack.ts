import { CommandBase, OCommandBuilder } from "../../handlers/CommandBase.js";
import { EmbedBuilder, GuildEmoji, SlashCommandBuilder } from "discord.js";
import { CustomMethods } from "../../handlers/CustomMethods.js";
import { client, Config } from "../../exportMain.js";

export default class Borracho extends CommandBase {
    public command: OCommandBuilder = new SlashCommandBuilder()
    .setName("hack")
    .setDescription("A quien vamos a hackear hoy 😈?")
    .addUserOption((option) => option.setName("usuario").setDescription("usuario a hackear").setRequired(true));
    options: any;
    public async run(): Promise<void> {

        const user = this.context.options.getUser("usuario")
        let correos = ["@gmail.com", "@outlook.com", "@hotmail.com","@outlook.es"];
        let cosas = ["Revistas", "Gatos", "Cosas Indevidas","Una Suscripcion De Nitro :3"];

        const loadingEmoji: GuildEmoji = client.emojis.cache.get("1042078068354859049")!;
        const correcto: GuildEmoji = client.emojis.cache.get("1057386561521590393")!;

        const cargando: EmbedBuilder = new EmbedBuilder()
            .setDescription(`${loadingEmoji} _Empezando proceso de hackeo contra ${user?.tag}_... ${loadingEmoji}`)
            .setColor(Config.colors.defaultEmbed);

        await this.context.reply({embeds: [cargando]});
        await CustomMethods.sleep(Math.floor(Math.random() * 5000));

        const hackeado: EmbedBuilder = new EmbedBuilder()
        .setTitle(`${correcto} Proceso de hackeo exitoso ${correcto}`) 
        .addFields([
            {name: "Ip:", value: `${[Math.floor(Math.random() * 192)]}.${[Math.floor(Math.random() * 168)]}.${[Math.floor(Math.random() * 255)]}.${[Math.floor(Math.random() * 255)]}`, inline: false},
            {name: "Correo:", value: `${user?.tag}${correos[Math.floor(Math.random() * correos.length)]}`, inline: false},
            {name: "Pruebas Incriminatorias:", value: `${cosas[Math.floor(Math.random() * cosas.length)]}`, inline: false},
        ])
        .setColor(Config.colors.defaultEmbed)
        .setFooter({text: `Enviado a la Base de Datos de ${client.user!.username} correctamente`});

        await this.context.editReply({ embeds: [hackeado]});
    }
}