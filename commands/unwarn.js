const { MessageEmbed, Permissions } = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "unwarn",
    alias: ["delwarn"],

run: (client, message, args) => {
     
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("✖️ ¡No tienes suficientes permisos para usar este comando!")
        const user = message.mentions.members.first()
        const member = message.mentions.members.first() || message.guild.chache.get(args[0])
        if(!user) return message.reply ("✖️ ¡No se ha encontrado al usuario que has especificado!")

        db.delete(`warns_${user.id}`, 1)

        const embed = new MessageEmbed()
        .setDescription(`Se ha eliminado un warn\n\n Usuario: ${user}\n\nModerador: ${message.author}`)
            .setColor("GREEN")

            message.reply({embeds: [embed], allowedMentions: { repliedUser: false }})
    }
}