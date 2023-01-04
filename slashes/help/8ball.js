const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {

    data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Comando 8ball")
    .addStringOption(option => option.setName("pregunta").setDescription("Formula tu pregunta").setRequired(true)),

    async execute(client, interaction){

        let question = interaction.options.getString("pregunta") 

        let answer = [
            "Si", "No", "Tal vez..", "Probablemente no.."
        ] 
    
        let finalAnswer = answer[Math.floor(Math.random() * answer.length)]
interaction.reply({
    embeds: [new MessageEmbed()
      .setTitle(`🎱 Pregunta 8ball 🎱`)
      .setDescription(` > Pregunta: ${question}\n\n > Respuesta: ${finalAnswer}`)
      .setColor("GREEN")
      .setTimestamp()
    ]
  })

    }
    
}