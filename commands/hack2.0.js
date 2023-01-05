const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "hack",
    alias: [" "],
    desc: "Sirve para hackear",
    cooldowns: 5,
    // Es solo diversion

    run: async (client, message, args) => {

        let ip = Math.floor(Math.random() * 91)
        let ip1 = Math.floor(Math.random() * 81)
        let ip2 = Math.floor(Math.random() * 54)
        let ip3 = Math.floor(Math.random() * 48)
        let numero = Math.floor(Math.random() * 10)
        let numero1 = Math.floor(Math.random() * 50)

        
        let correo = [
            "@gmail.com", "@gmail.co", "@outlook.es", "@outlook.com", "@outlook.co", "@hotmail.es"
          ] 
    
        let finalcorreo = correo[Math.floor(Math.random() * correo.length)] 
        const userID = args[0]

        let hackeado = message.mentions.members.first() || message.guild.members.cache.get(userID) || message.author
        if(!args[0]) return message.reply({
          embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription("Menciona a quien quieres hackear")
          ]
        })
        if(hackeado.id == message.author) return message.reply({
          embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription("Eres Estupido o te haces?")
          ]
        })

        let mensaje = await message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(` <a:_:1012452783682760744> Proceso de hackeo contra ${hackeado} <a:_:1012452783682760744>`)
                .setColor("RED")
             ]

        })

        setTimeout(() => {
            mensaje.edit({
              embeds: [new MessageEmbed()
                .setTitle("<a:_:1042587290318413985> **Hackeado Correctamente** <a:_:1042587290318413985>")
                .setDescription(`${hackeado} Lo siento por revelar tus datos`)
                .addFields(
                    {name: "IP:", value: `${ip}.${ip1}.${ip2}.${ip3}`},
                    {name: "Gmail:", value: `${hackeado.user.username}${finalcorreo} `},
                    {name: "Contraseña", value: `${hackeado.user.username}.${numero}${numero1} `}
                )
                .setColor("GREEN")
              ]
            })
            }, 10000) 
            
    }
}