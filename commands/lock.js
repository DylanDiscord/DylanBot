const Discord = require('discord.js');

module.exports = {
  name: "lock", 
  alias: ["cerrar"], 

run: async (client, message, args) => {
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("¡No tienes suficientes permisos para usar este comando!")

   const everyone  = message.guild.roles.cache.find(r => r.name == "@everyone")

   message.channel.permissionOverwrites.edit(everyone, {SEND_MESSAGES: false})

   message.channel.send({ content: "Se bloqueo el canal con exito" }) 


 }

} 
