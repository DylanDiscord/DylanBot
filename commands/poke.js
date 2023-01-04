const Discord = require('discord.js')
const NekoClient = require("nekos.life")
const neko = new NekoClient()


module.exports = {
   name: "feed",
   premiun: false,

   run: async (client, message, args) =>{

    const user = await message.mentions.users.first()

    if(!user) return message.channel.send("Debes nombrar a quien alimentar.")

    if (user.id == message.author.id) return message.channel.send("No puedes hacer eso")



        neko.feed().then(neko => {
        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag} Alimento a ${user.tag}`)
        .setImage(neko.url)
        .setColor("RANDOM")

        message.channel.send({ embeds: [embed] })
    })

       function newFunction() {
           return neko.sfw.feed
       }
   }
}