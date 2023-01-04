const NSFW = require("discord-nsfw");
const nsfw = new NSFW();
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "hentai",
  aliases: [],
  run: async(client, message, prefix, args) => {

    if(!message.channel.nsfw) {
        return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription("<a:warn:997860688947056710> | <:nsfw:1010909001602584617> **Este canal no es nsfw** <:nsfw:1010909001602584617> | <a:warn:997860688947056710>")
                .setColor("RANDOM")
            ]
        })
    }
       embed = new MessageEmbed()
       .setTitle('Hentai Imagen')
       .setColor("RANDOM")
       .setImage(await nsfw.hentai())
       message.reply({ embeds: [embed] });
    }
}