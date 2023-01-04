const db = require("quick.db")
const Discord = require("discord.js")
const { MessageEmbed } = require ("discord.js")

module.exports = {
    name: "balance",
    aliases: ["bl"],

    run: async (client, message, args) => {

        let user = message.mentions.members.first() || message.author;

        let money = await db.fetch(`money_${user.id}`)
        if(money === null) money = 0;

        message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`${user.tag} tu balance es de ${money}$`)
                .setColor("GREEN")
            ]
        })
    }
}