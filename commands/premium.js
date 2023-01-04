const Discord = require("discord.js");
const {Client, MessageEmbed} = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "premium",
    run: async(client, message, args) => {
        let d = db.get(`premium_${message.author.id}`);
        if(d !== true) {
            let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Este comando solo es para usuarios premiums\n> Quieres hacerte premium?\n> Pues mandame un mensaje al dm de mi dueño `__DinoGG__#5456`")
            message.channel.send({ embeds: [embed] })
        } else {
            let f = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Felicidades ${message.author.tag} eres un usuario premium 💎`)
            message.channel.send({ embeds: [f] })
        }
        
    }
        
}