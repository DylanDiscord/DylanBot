const Discord = require("discord.js");

module.exports = {
    name: "embedc",
    desc: "Sirve para crear un mensaje embed personalizado",

    run: async(client, message, args) => {

        if(!message.member.permissions.has("MANAGE_MESSAGES"))return message.reply("No tienes los permisos suficientes! :pensive:\nPermisos faltantes : `MANAGE_MESSAGES`")
        if(!message.guild.me.permissions.has("MANAGE_MESSAGES"))return message.reply("No tengo los permisos suficientes! :cry:\nPermisos faltantes : `MANAGE_MESSAGES`")

        let texto = args.join(` `)
        if(!texto) return message.reply("Debes ingresar tu mensaje\nEjemplo de como lo debes hacer\n[Titulo] >> [Descripción] >> [Color]")

        let opciones = texto.split(" >> ")

        const embed = new Discord.MessageEmbed()
            .setTitle(opciones[0])
            .setDescription(opciones[1])
            .setImage(`${opciones[2]}`)
            .setColor(opciones[3])

            message.channel.send({ embeds: [embed] })
            
    }
}