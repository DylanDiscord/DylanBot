const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const NekoClient = require("nekos.life")
const neko = new NekoClient()

module.exports = {

    data: new SlashCommandBuilder()
    .setName("abrazo")
    .setDescription("Aquien vas a abrazar? 🥰")
    .addUserOption(option => option.setName("usuario").setDescription("usuario a abrazar").setRequired(true)),

    async execute(client, interaction){

        const usuario = interaction.options.getUser('usuario'); 

        let embed = new MessageEmbed()
        neko.hug().then(neko => {
            const embed = new Discord.MessageEmbed()
            .setDescription(`${interaction.user.tag} abrazo a ${usuario.tag}`)
            .setImage(neko.url)
            .setColor("GREEN")

            interaction.reply({ embeds: [embed] })
        })
        function newFunction() {
            return neko.sfw.hug
        }
    }
}
