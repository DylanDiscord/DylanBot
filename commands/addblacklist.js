const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "addblacklist",
    aliases: ["ab"],
    run: async(client, message, args) => {
        
        if(message.member.id !== "831683895631020112") {
            return message.channel.send({
             embeds: [new MessageEmbed()
                 .setDescription("**Solo el Owner del Bot puede utilizar este comando**")
                 .setColor("RED")
             ]
            })
         }

        let user = message.mentions.members.first() || user.id
        if(!user) return message.channel.send("Tienes que mencionar a una persona")

        if(db.has(user.id)) return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`${user.user.tag} ya esta registrado en la blakclist`)
                .setColor("RED")
            ]
        })

        db.set(`addblacklist_${user.id}`, user.user.tag)

        message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`${user.user.tag} se ha registrado correctamente a la blacklist`)
                .setColor("GREEN")
            ]
        })
    }
        
}