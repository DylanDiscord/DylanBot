const Discord = require(`discord.js`);
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "confesion",
  aliases: ["confe"],
 run: async (client, message, args) => {

const confe = args.slice(0).join(` `)
let canal = await db.get(message.guild.id)
let channel = client.channels.cache.get(canal)

if(!channel) return message.reply({
  embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription("No hay ningun canal de Confesiones establecidos.!")
  ]
})
if(!confe) return message.reply({
  embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription("Escribe tu confesión.")
  ]
})

let embed = new Discord.MessageEmbed()
.setTitle("Nueva Confesion")
.setDescription(`${confe}`)
.setFooter({ text: `Creador: Anonimo`, iconURL: `${message.guild.iconURL({ dynamic: true })}`})
.setColor("AQUA")

channel.send({ embeds: [embed] })

message.delete()
}
}