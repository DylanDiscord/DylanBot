const Discord = require('discord.js');

module.exports = {
    name: "delete-role",
    alias: ["deleterole"],

run: async (client, message, args) => {

  if(!message.member.permissions.has("ADMINISTRATOR"))return message.reply("No tienes los permisos suficientes! :pensive:\nPermisos faltantes : `MANAGE_ROLES`")
  if(!message.guild.me.permissions.has("ADMINISTRATOR"))return message.reply("No tengo los permisos suficientes! :cry:\nPermisos faltantes : `MANAGE_ROLES`")

    const role = message.mentions.roles.first()
    if(!role) return message.reply('Debes mencionar un rol!')

    let FinishRole = await message.guild.roles.delete(`${role.id}`)

    const del = new Discord.MessageEmbed()
    .setTitle('Rol borrado!')
    .setDescription(`**El rol ${role} ha sido eliminado correctamente!**`)
    .setColor('GREEN')

    message.channel.send({ embeds: [del] })
     
  }
    
}