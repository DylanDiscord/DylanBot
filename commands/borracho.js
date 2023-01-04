const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'borracho',
    aliases: ['borracho', 'borrachito'],
    desc: 'Comando para ver cuanto de alcohólico está un usuario',
    run: async (client, message, args, prefix) => {
        const borracho = Math.floor(Math.random() * 100)
        message.channel.send({embeds: [
            new Discord.MessageEmbed()
            .setTitle(`🍺**Tu Nivel de Borracho es de ${borracho} **🍺`)
            .setImage("https://c.tenor.com/oj_-OFs-4mAAAAAi/rafsdesign-rafs.gif")
            .setColor("RANDOM")
            .setFooter({ text: `Dino Bar - cliente: ${message.author.tag} `})
            .setTimestamp()
            
        ]}).catch(() => {message.reply(`No se ha podido mostrar correctamente el porcentaje de alcohol en vena`)})
    }
}