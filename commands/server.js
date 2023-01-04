const Discord = require('discord.js')
module.exports = {
    name: "servers",
    aliases: [""],
    desc: "Sirve para ver en que servidores está tu bot",
    
    run: async (client, message, args, prefix) => {
   const servers = new Discord.MessageEmbed()

   .setTitle(`¡El bot está en ${client.guilds.cache.size} servidores! :D`)
   .setDescription(`**${client.guilds.cache.map(m => m.name).join('\n')}**`) // aca lanza los nombres de cada sv 
   .setColor("YELLOW")

   message.reply({ embeds: [servers] })

 }

} 