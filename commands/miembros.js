const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "miembros",//Nombre del comando
  alias: ["member"],//Alias del comando (Por si quieres activar el comando de 2 maneras) Si no quieres alias simplemente quitale las comillas ""
run: async  (client, message, args) => {
let embed = new MessageEmbed()

.setTitle("MemberCount")
.setColor("RANDOM")
.setDescription(`**Total Miembros**\n 😀 **${message.guild.memberCount}**\n\n**Humanos**\n 👩🏼‍🤝‍🧑🏽 **${message.guild.members.cache.filter(member=> !member.user.bot).size}**\n\n**Bots**\n 🤖 **${message.guild.members.cache.filter(member=> member.user.bot).size}**`)
.setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))
.setTimestamp()
message.channel.send({ embeds: [embed] })

//code
    
  }

}

    
  