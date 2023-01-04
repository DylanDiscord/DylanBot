const {MessageEmbed} = require ("discord.js")
module.exports = {
  name: "banlist",
  description: "lista de banimentos",
  aliases: ["banl"],

  run: async (client, message, args) => {

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`✖️ | ${message.author} **No tienes permisos para utilizar este comando.**`)

    const theustotoso = new MessageEmbed()
    .setTitle('Ban List')
    .setDescription((await message.guild.bans.fetch()).map((theuszin) => theuszin.user.tag).join("\n") || "\`Ningun miembro fue baneado\`" )
    .setColor('RANDOM')
    .setTimestamp(new Date())
    
    message.channel.send({embeds: [theustotoso]})
   }
 }