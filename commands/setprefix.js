const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
module.exports = {
    name: "setprefix",
    aliases: [""],
    desc: "Sirve para cambiar el prefix de Dylan",
    
    run: async (client, message, args, prefix) => {
        if(!message.member.permissions.has("ADMINISTRATOR"))return message.reply({
            embeds: [new MessageEmbed()
                .setDescription("**No tienes el permiso de ``ADMINISTRATOR``**")
                .setColor("RED")
            ]
        })
        let d = db.get(`premium_${message.author.id}`);
        if(d !== true) {
            let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Este comando solo es para usuarios premiums")
           return message.channel.send({ embeds: [embed] })
        }

        if(!args[0]) return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription("**Debes escribir un prefix valido.**")
                .setColor("RED")
            ]
        })

        if(db.set(`setprefix_${message.guild.id}`, args[0]))

        message.channel.send({
            embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`El prefix ahora es \`\`${args[0]}\`\``)
            ]
        })

    }

} 