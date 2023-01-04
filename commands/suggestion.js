const Discord = require(`discord.js`);
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton} = require(`discord.js`)
const db = require("quick.db")

module.exports = {
  name: "setsugg",
  alias: ["ss", "set-suggest", "s-s"],
run: async (client, message, args) => {

   if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("✖️ **¡No tienes suficientes permisos para usar este comando!**")

    const id = args[0]
    if(!id) return message.reply("✖️ `|` eso no es un canal valido.")

    const canal = message.mentions.channels.first() || client.channels.cache.get(id)
if (!canal) return message.reply("✖️ `|` Eso no es in canal valido.")
    
let canalservidor = message.guild.channels.resolve(canal.id)
    if(!canalservidor) return message.reply("✖️ `|` debes mencionar un canal de este servidor.")

db.set(message.guild.id, canal.id)
    
message.reply(`El canal de sugerencias ahora es **${canal.name}**!`)
    
  }
  
}