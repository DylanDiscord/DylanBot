const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "rblacklist",
    aliases: ["ab"],
    run: async(client, message, args) => {
        
        if(message.member.id !== "831683895631020112") {
            return message.channel.send({
             embeds: [new MessageEmbed()
                 .setDescription("**Solo el Owner del Bot puede utilizar este comando**")
             ]
            })
         }
        let user = message.mentions.members.first()
        if(!user) return message.channel.send("Tienes que mencionar a una persona")

        if(db.has(user.id)) return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`${user.user.tag} no esta registrado a la blacklist`)
                .setColor("RED")
            ]
        })
        db.delete(`addblacklist_${user.id}`, user.user.tag)

        message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`${user.user.tag} se ha eliminao correctamente de la blacklist`)
                .setColor("GREEN")
            ]
        })
    }
        
}