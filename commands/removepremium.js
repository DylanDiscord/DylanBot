const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "removepremium",
    run: async(client, message, args) => {
        let owner_id = "831683895631020112"
        if(message.member.id !== owner_id) {
            message.channel.send("Solo el owner puede ejecutar este comando")
        } else {
            let user = message.mentions.users.first() || client.users.cache.get(arg[0]);

            if(!user) {
                let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Debes especificar un usuario.")
                message.channel.send({ embeds: [embed] })
            } if(db.get(`premium_${user.id}`) === null || db.get(`premium_${user.id}`) === false) {
                let remove = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`El usuario no se encuenta en la lista de los usuarios premiums`)
                message.channel.send({ embeds: [remove] })
            } else {
                let embed2 = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${user.tag} ha sido eliminado de los usuarios premiums 💎 `);
                message.channel.send({ embeds: [embed2] })
                db.set(`premium_${user.id}`, false)
            }
        }
        
    }
        
}