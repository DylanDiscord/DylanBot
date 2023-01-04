const Discord = require("discord.js");
const {Client, MessageEmbed} = require("discord.js");

module.exports = {
    name: "diversion",
  alias: "acc",
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed() 
        .setTitle("**🎮 Comandos de Diversion 🎮**")
        .setDescription(" > 💥** Todas los comandos de diversion disponibles**💥\n\n```d!borracho\nd!meme\nd!8ball\nd!avatar\nd!pet```")
        .setFooter({ text: `${message.author.tag}`, iconURL: `${message.guild.iconURL({ dynamic: true })}`})
        .setColor("RANDOM")
        message.channel.send({ embeds: [embed] })
    }
        
}