const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "addpremium",
    run: async(client, message, args) => {

        if(message.member.id !== "831683895631020112") {
            message.channel.send("Solo el owner puede ejecutar este comando")
        } else {
            let user = message.mentions.users.first() || client.users.cache.get(args[0]);

            if(!user) {
                let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Debes especificar un usuario.")
                message.channel.send({ embeds: [embed] })
            } else {
                let embed2 = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${user.tag} ha sido añadido a la lista de los usuarios premiums 💎 `);
                message.channel.send({ embeds: [embed2] })
                db.set(`premium_${user.id}`, true)
            }
        }
        
    }
        
}