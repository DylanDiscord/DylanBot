const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js")
const { inspect } = require("util")

module.exports = {
   name: "eval",

   run: async (client, message, args) =>{

    if(message.member.id !== "831683895631020112") {
       return message.channel.send({
        embeds: [new MessageEmbed()
            .setDescription("**Solo el Owner del Bot puede utilizar este comando**")
        ]
       })
    }
    const codigo = args.join(" ")
    if(!codigo) return message.channel.send({
        embeds: [new MessageEmbed()
            .setDescription("Debes escribir el codigo a evaluar")
            .setColor("RED")
        ]
    })
    try {
        const evaled = eval(codigo)
        const palabras = ["token", "destroy"]
        if(palabras.some(word => message.content.toLowerCase().includes(word))){
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setDescription("Estas palabras no estan permitidas.")
                    .setColor("RED")
                ]
            })
            
        }
        const embed = new Discord.MessageEmbed()
        .setTitle("Codigo evaluado correctamente!")
        .addField(`**Tipo**:`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
        .addField(`**Evaluado en**:`, `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\``, true)
        .addField(`Entrada`, `\`\`\`js\n${codigo}\`\`\``)
        .addField(`Salida`, `\`\`\`js\n${inspect (evaled, {depth: 0})}\`\`\``)
        .setColor("GREEN")

        message.channel.send({ embeds: [embed]})
    } catch(e) {
        const embedfallo = new Discord.MessageEmbed()
        .setColor("RED")
        .addField(`Entrada`, `\`\`\`js\n${codigo}\`\`\``)
        .addField(`Error`, `\`\`\`js\n${error}\`\`\``)

        message.channel.send({ embeds: [embedfallo] })
    }
   }
}