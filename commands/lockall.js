const Discord = require('discord.js')

module.exports = {
  name : 'lockall',
  aliases : ['cerratodo', 'cerrart'],
  desc: "Cierra todos los canales de tu server!",
  category: 'Moderation',
  usage: `lockall`,

  run: async(client, message, prefix, args) => {

    if(!message.member.permissions.has("ADMINISTRATOR")) {
        message.channel.send("<a:equis:933058325178904636> **| No tienes los permisos de:**\`\`\`\nADMINISTRATOR\n\`\`\`")
    } else {

        try {
            
        message.guild.channels.cache.forEach(channel => {

            if(channel.type === "GUILD_TEXT") {
                channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: false}).catch(e => console.log(e));
                channel.send(`🔐 **| Este canal ha sido bloqueado por \`${message.author.tag}\`**`)
            }
            
        });
        } catch (e) {
            console.log(e)
        }

        
    }

  }
}