const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Mira la latencia de Dylan"),

       async execute(client, interaction) {
         
        const embed = new Discord.MessageEmbed()
        .setDescription(`Mi latencia es de: ${client.ws.ping}ms`)
        .setColor("GREEN")

        interaction.reply({ embeds: [embed] })
    } 
}