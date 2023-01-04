const Discord = require('discord.js')

module.exports = {
    name: "unban",
    aliases: ["desbanear"],
    desc: "Desbanea a un usuario del servidor",
    permisos: ["BAN_MEMBERS"],
    permisos_bot: ["BAN_MEMBERS"],
    category: ":shield: Moderación",
    usage: "unban <id>",
    owner: false,
    run: async (client, message, args) => {
        

      if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("✖️ **¡No tienes suficientes permisos para usar este comando!**")
let user = client.users.cache.get(args[0])
  if(!args[0]) return message.reply({content:`✖️ | Escribe la id del usuario a desbanear`})
  if(!user) return message.reply({content: `✖️ | ID inválida`})

  message.guild.bans.fetch().then(bans => {
    if(bans.size == 0) return message.reply({content:`✖️ | El servidor no tiene usuarios baneados`})

    let User = bans.find(b => b.user.id == user)

    if(!User) return message.reply({content:`✖️ | El usuario no esta baneado`})

    message.guild.members.unban(User.user)
      
  })

  const embed = new Discord.MessageEmbed()
    .setThumbnail(user.displayAvatarURL({dynamic: true}))
  .setTitle(`<a:Ve:1008094050039103588> Usuario desbaneado`)
  .setDescription(`Se ha desbaneado a **${user.tag} (${user.id})** del servidor!`)
    .setFooter({text: `${message.guild.name}`, iconURL: message.guild.iconURL({dynamic: true})}) 
  .setColor("GREEN")
.setTimestamp()
  
message.reply({embeds: [embed]})
    }
}

console.log("UnBan Iniciado Correctamente")