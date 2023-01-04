const db = require("quick.db")
const Discord = require("discord.js")
const { MessageEmbed } = require ("discord.js")
const ms = require("ms")

module.exports = {
    name: "daily",
    alias: ["dy"],

    run: async (client, message, args) => {
        let timeout = 86400000

        let amout = 500

        let daily = await db.fetch(`daily_${message.author.id}`);
        if(!daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            message.channel.send({
                embeds: [new MessageEmbed()
                    .setDescription(`Ya has obtenido esta recompensa\nVuelve a reclamarla en ${time}`)
                    .setColor("RED")
                ]
            })
        } else {
            let embed = new MessageEmbed()
            .setAuthor("Daily")
            .setColor("GREEN")
            .setDescription("Recompensa Diaria")
            .addField("Has Obtenido:", `${amout}`)
            message.channel.send({ embeds: [embed] })
            db.add(`money_${message.author.id}`, amout)
            db.set(`daily_${message.author.id}`, Date.now())
        }
        
    }
}