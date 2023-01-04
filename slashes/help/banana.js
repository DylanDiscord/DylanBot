const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
  data: new SlashCommandBuilder()
.setName("banana")
.setDescription("Te muestra el Tamaño de tu Banana.🍌"), 
  
  
  async execute(client, interaction){
    let cm = Math.floor(Math.random() * 100)

  interaction.reply({
   
    embeds: [new MessageEmbed()
      .setTitle(`${interaction.user.tag} Tu banana mide ${cm}cm`)
      .setImage("https://us.123rf.com/450wm/imagestore/imagestore1606/imagestore160600725/58020236-pl%C3%A1tano-pelado-en-el-fondo-blanco.jpg")
      .setColor("GREEN")
      .setTimestamp()
    ]
  })
  }
  }