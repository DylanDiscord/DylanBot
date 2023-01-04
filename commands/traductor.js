const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: "traductor",
  aliases:["translate"],
  run: async (client, message, args) => {

    const texto = args.slice(1).join(" ")
    if (!args[0]) return message.reply("No encuentro ese idioma");
    if (!texto) return message.reply("Especifica el texto a traducir");
    const translated = await translate(texto, {to: args[0] });
    const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, `${ message.author.displayAvatarURL({ dynamic: true })}`)
    .setDescription("**Contenido**: " + "`" + texto + "`"+ "\n**Traducido**: " + "`" + `${translated.text}` + "`" )
    .setTimestamp()
  message.reply({ embeds: [embed] });
  },
};