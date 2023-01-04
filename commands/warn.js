const { MessageEmbed, Permissions } = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "warn",
    alias: [],

run: async(client, message, args) => {
     
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("✖️ **¡No tienes suficientes permisos para usar este comando!**")
        const user = message.mentions.members.first()
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply("**✖️ ¡No se ha encontrado al usuario que has especificado!**")

        if(member === member.id)
        return message.reply("**✖️ ¡No te puedes warnear a ti mismo!**")

        if(member.roles.highest.position >= message.member.roles.highest.position)
        return message.reply("✖️ **¡Tu rol está por debajo del usuario que quieres warnear!**")


        if(!db.has(`warns_${user.id}`, 0)){
            db.set(`warns_${user.id}`, 0,)
        }

        const razon = args.join(" ").slice(22)
        if(!razon) return message.reply("✖️ ¡No has especificado ninguna razón!")

        db.add(`warns_${user.id}`, 1)

        const embed = new MessageEmbed()
          .setTitle(`${message.author.tag}`)
            .setDescription(`**Usuario:**${user}\n\n**Moderador/a: **${message.author}\n\n**Razón:** **${razon}**`)
            .setColor("RED")
            .setTimestamp()

            message.reply({embeds: [embed], allowedMentions: { repliedUser: false }})
    }
}