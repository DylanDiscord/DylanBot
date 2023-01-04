const Discord = require("discord.js");
const {MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton} = require("discord.js");

module.exports = {
    name: "send",
    alias:[],
    run: async(client, message, args) => {
       const channel = message.mentions.channels.first()
       let permiso = message.member.permissions.has("ADMINISTRATOR")
        if(!permiso) return message.channel.send("❌ **Solo los STAFF de este servidor pueden ejecutar este comando.**")
       let sendch = message.guild.channels.cache.find(channel => channel.name === `${channel}`)
       const mensaje = args.slice(1).join(` `);
       if(!channel) return message.reply("**Especifica un Canal donde vas a enviar el mensaje**")
       if(!message) return message.reply("**Especifica el mensaje a enviar**")
       message.delete()
       channel.send(`${mensaje}`)

    }
        
}