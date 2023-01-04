const Discord = require("discord.js")
module.exports = {
    name: "hangman",
    description: "Guess the word",
    category: "Info",
    cooldown: 7,
    aliases: ["hm"],
    args: false,
    devOnly: false,
    guildOnly: true,
    run: async (client, message, args, prefix) => {
      
      const words = ["ciudad", "palacio", "urbanizacion", "festival", "zapato", "colegio", "tomillotiempillo"]
      let spaces = []
      let lives = 5
      const selectWord = words[Math.floor(Math.random() * words.length)]
      let splitWord = selectWord.split("")
      
      //Determinar los espacios de la palabra
      for(let i = 0; i < splitWord.length; i++) {
        spaces.push("_")
      }
  
      message.channel.send(`Vamos a jugar al ahorcado\n\`\`\`${spaces.join(" ")}\`\`\`\nVidas: ${lives}`)
  
      const msg = await message.channel.send("Dame una letra, si no pertenece a la palabra perderas una vida")
      const filter = m => m.author.id === message.author.id
  
      //Inicio del juego
      while(true) {
        let index = 0
        
        try {
          const collect = await message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ["time"] })
          const contentMessage = collect.first().content.toLowerCase()
          
          if(lives <= 0) return message.channel.send("Haz perdido")
        
          if(spaces.includes(contentMessage)) {
            if(contentMessage == "_") {
              message.channel.send("Letra no valida")
            } else {
              message.channel.send("Esa letra ya esta en la palabra")
            }
          }
        
          if(!splitWord.includes(contentMessage)) {
            message.channel.send("Esa letra no es correcta")
            lives -= 1
          }
        
          for(x of splitWord) {
            if(x === contentMessage) {
              spaces[index] = contentMessage
            }
            index += 1
          }
        
          message.channel.send(`\`\`\`\n${spaces.join(" ")}\`\`\`\nVidas: ${lives}`)
      
          if(spaces.join("") === splitWord.join("")) return message.channel.send("Haz ganado")
        } catch(e) {
          return message.channel.send("Ha acabado el juego")
        }
      }
    }
  }