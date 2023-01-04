const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const dc = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Di un texto como el bot")
    .addStringOption(option => option .setName("mensaje").setDescription("Mensaje a decir").setRequired(true)),// Creamos la opcion

       async execute(client, interaction) {
                    
        const text = interaction.options.getString("mensaje") //Requerimos el texto
         
        interaction.reply({ content: `${text}` }) // Enviamos el mensaje
    } 
}