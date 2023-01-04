const db = require("quick.db")
const Discord = require("discord.js")
const { MessageEmbed } = require ("discord.js")
const ms = require("ms")

module.exports = {
    name: "monthly",
    alias: ["my"],

    run: async (client, message, args) => {
        let timeout = 2592000000

        let amout = 1000

        let monthly = await db.fetch(`monthly_${message.author.id}`);
        if(!monthly !== null && timeout - (Date.now() - monthly) > 0) {
            let time = ms(timeout - (Date.now() - monthly));

            message.channel.send({
                embeds: [new MessageEmbed()
                    .setDescription(`Ya has obtenido esta recompensa\nVuelve a reclamarla en ${time}`)
                    .setColor("RED")
                ]
            })
        } else {
            let embed = new MessageEmbed()
            .setAuthor(`Monthly`)
            .setColor("GREEN")
            .setDescription("Recompensa Mensual")
            .addField("Has Obtenido:", `${amout}`)
            message.channel.send({ embeds: [embed] })
            db.add(`money_${message.author.id}`, amout)
            db.set(`monthly_${message.author.id}`, Date.now())
        }
        
    }
}