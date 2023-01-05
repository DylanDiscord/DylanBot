const Discord = require('discord.js')
module.exports = {
    name: "servers",
    aliases: [""],
    desc: "Sirve para ver en que servidores está tu bot",
    
    run: async (client, message, args, prefix) => {
      if(message.member.id !== "831683895631020112") {
        return message.channel.send({
         embeds: [new MessageEmbed()
             .setDescription("**Solo el Owner del Bot puede utilizar este comando**")
         ]
        })
     }
   const servers = new Discord.MessageEmbed()

   .setTitle(`¡El bot está en ${client.guilds.cache.size} servidores! :D`)
   .setDescription(`**${client.guilds.cache.map(m => m.name).join('\n')}**`) // aca lanza los nombres de cada sv 
   .setColor("YELLOW")

   message.reply({ embeds: [servers] })

 }

} 