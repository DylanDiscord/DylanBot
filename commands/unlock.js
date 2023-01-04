const Discord = require('discord.js');

module.exports = {
  name: "unlock", 
  alias: ["cerrar"], 

run: async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("✖️ ¡No tienes suficientes permisos para usar este comando!")

   const everyone  = message.guild.roles.cache.find(r => r.name == "@everyone")

   message.channel.permissionOverwrites.edit(everyone, {SEND_MESSAGES: true})

   message.channel.send({ content: "Se desbloqueo  el canal con exito" }) 


 }

} 
