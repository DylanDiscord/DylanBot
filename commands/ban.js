const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban", 
  alias: ["b"], 

run: async(client, message, args) => {

  if(!message.member.permissions.has("BAN_MEMBERS"))return message.reply({
    embeds: [new MessageEmbed()
        .setDescription("**No tienes el permiso de ``BAN_MEMBERS``**")
        .setColor("RED")
    ]
})
  if(!message.guild.me.permissions.has("BAN_MEMBERS"))return message.reply("No tengo los permisos suficientes! :cry:\nPermisos faltantes : `BAN_MEMBERS`")

    const user = message.mentions.members.first();
  if(!user) return message.reply("Debes mencionar un usuario!")
  if(user.user.id === message.author.id) return message.reply("No puedes banearte a ti mismo!")
    if(user.user.id === client.user.id)return message.reply("No me voy a autobanear WTF") 
    if(user.permissions.has("ADMINISTRATOR"))return message.reply({
      embeds: [new MessageEmbed()
        .setDescription(`**No puedes Banear a ADMINISTRADORES!.**`)
        .setColor("RANDOM")
    ]
    })

    if(message.member.roles.highest.position <= user.roles.highest.position) return message.reply("No puedes banear a alguien con tu mismo rol o superior!");
    if(message.guild.me.roles.highest.position <= user.roles.highest.position) return message.reply("Para que pueda banear al usuario mi rol debe estar por encima de el!");

    const razon = args.slice(1).join(' ')
  if(!razon) return message.reply({
    embeds: [new MessageEmbed()
      .setDescription(`**Debes escribir La Razon del Baneo.**`)
      .setColor("RANDOM")

  ]
  })

    const b = new Discord.MessageEmbed()
    .setTitle('Usuario baneado correctamente!')
    .setDescription(`**Usuario:** <@${user.id}> \n\n**Baneado por:**\n\n**Motivo**: ${razon}`)
    .setColor('RED')
    .setThumbnail(user.displayAvatarURL())

    message.channel.send({embeds: [b]})

    user.ban({ reason: razon})
  await message.guild.bans.fetch().then(bans => {
    if (bans.has(userId)) {
        return message.guild.members.unban(userId);
    } else {
        return message.reply("El usuario no esta baneado")
    }
});

 }

} 