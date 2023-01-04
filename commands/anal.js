const Discord = require('discord.js')
const NSFW = require("discord-nsfw")
const nsfw = new NSFW()
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "anal",
    run: async (client, message, args) => {

    if(!message.channel.nsfw) {
    return message.channel.send({
        embeds: [new Discord.MessageEmbed()
            .setDescription("<a:warn:997860688947056710> | <:nsfw:1010909001602584617> **Este canal no es nsfw** <:nsfw:1010909001602584617> | <a:warn:997860688947056710>")
            .setColor("RANDOM")
        ]
    })
     }

    if (!args.length) return message.reply({
        embeds: [new Discord.MessageEmbed()
            .setDescription("Tienes que mencionar a alguien!")
            .setColor("RED")
        ]
    })
    
    const usuario = message.mentions.users.first()

    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.tag} le dio anal a  ${usuario.tag} `)
    .setImage(await nsfw.anal())
    .setFooter({text: `Te gusto ${usuario.tag}?`})
    .setColor("RANDOM")
    

    message.reply({ embeds: [embed] })
    } 
}