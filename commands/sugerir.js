const Discord = require(`discord.js`);
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton} = require(`discord.js`)
const db = require("quick.db")

module.exports = {
  name: "sugg",
  alias: ["sugerencia", "s", "sg"],
 run: async (client, message, args) => {

const suge = args.slice(0).join(` `)
let canal = await db.get(message.guild.id)
let channel = client.channels.cache.get(canal)

if(!channel) return message.reply("no hay ningun canal de sugerencias establecido.")
if(!suge) return message.reply("Escribe tu sugerencia.")

let embed = new Discord.MessageEmbed()
.setTitle(`Sugerencia creada por ${message.author.tag}`)
.setDescription(`> ${suge}`)
.setFooter({ text: `Sugerencia creada Correctamente`, iconURL: `${message.guild.iconURL({ dynamic: true })}`})
.setColor("GREEN")

channel.send({ embeds: [embed] }).then(m => {
  m.react(`👍`)
  m.react(`🤷‍♂️`)
  m.react(`👎`)
})

message.reply(`Se envío correctamente tu sugerencia, puedes mirarla en ${channel}`)

    }
  
}