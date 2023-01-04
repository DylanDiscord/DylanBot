const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "despedidas",
    alias:[],
    run: async(client, message, args) => {
       if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("No tienes suficientes permisos")
       if(!args[0]) return message.channel.send("Ingresa una accion valida")
       if(args[0] ===`channel`)
       {
            if(args[1]== `none`) {
                if(db.has(`farewell_channel_${message.guild.id}`)) {
                    db.delete(`farewell_channel_${message.guild.id}`)
                    return message.channel.send("Se ha eliminado el canal de bienvenidas")
                } else {
                    return message.channel.send("No existe ningun canal configurado")
                }
                
            } else if(!args[1] != `none` && args[1]) {
                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
                if(!channel) return message.channel.send("No encontre el canal")
                db.set(`farewell_channel_${message.guild.id}`, channel.id)
                return message.channel.send("Canal establecido correctamente")
            } else if(!args[1]) {
                return message.channel.send("Ingresa una id valida")
            }
       } else if(args[0] == `message`) {
            if(!args[1]) return message.channel.send("Ingresa un mensaje valido")
            db.set(`farewell_message_${message.guild.id}`, args.slice(1).join(" "))
            return message.channel.send("Mensaje establecido correctamente")
       }
    }      
}