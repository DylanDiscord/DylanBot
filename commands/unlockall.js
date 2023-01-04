const Discord = require('discord.js')

module.exports = {
  name : 'unlockall',
  aliases : ['abrirtodo', 'abrirt'],
  desc: "Abre todos los canales de tu server!",
  category: 'Moderation',
  usage: `unlockall`,

  run: async(client, message, prefix, args) => {

    if(!message.member.permissions.has("ADMINISTRATOR")) {
        message.channel.send("| No tienes los permisos de:**\`\`\`\nADMINISTRATOR\n\`\`\`")
    } else {

        try {
            
        message.guild.channels.cache.forEach(channel => {

            if(channel.type === "GUILD_TEXT") {
                
                channel.send(`🔓 **| Este canal ha sido desbloqueado por \`${message.author.tag}\`**`)

                channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: true}).catch(e => console.log(e));
            }
            
        });
        } catch (e) {
            console.log(e)
        }

        
    }

  }
}