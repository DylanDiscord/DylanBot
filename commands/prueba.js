const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js")

module.exports = {
  name : 'prueba',

  run: async(client, message, prefix, args) => {
    let vicio = Math.floor(Math.random() * 100)
    let numero = Math.floor(Math.random * 10)
   let numero1 = Math.floor(Math.random * 50)

   let mensaje = await message.channel.send({
    embeds: [new MessageEmbed()
    .setTitle("Calculando tu nivel de vicio")
    .setColor("RANDOM")
  ]
})

setTimeout(() => {
    mensaje.edit({
      embeds: [new MessageEmbed()
        .setTitle("Tu nivel de vicio a sido correctamente calculado")
        .setDescription(` || Tu nivel es de ${vicio}% ||`)
        .setColor("GREEN")
      ]
    })
    }, 10000) 
  }
}