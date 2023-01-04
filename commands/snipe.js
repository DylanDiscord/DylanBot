const { MessageEmbed } = require("discord.js")
const { minTransformDependencies } = require("mathjs")

module.exports = {
    name: 'snipe',
    description: 'Ver anterior mensaje eliminado.',

    run: async(client, message, args, prefix) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription("No tienes suficientes permisos!")
                .setColor("GREEN")
            ]
        })
        const msg = client.snipes.get(message.channel.id)
        if(!msg) return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`No hay mensajes eliminados hasta ahora.`)
                .setColor("RED")
            ]
        })

        const embed = new MessageEmbed()
        .setTitle(`${message.author.tag}`)
        .setColor("AQUA")
        .setDescription(` > **Mensaje eliminado del canal <#${message.channel.id}>**\n\n` + '> **Mensaje de:** ' + `<@${msg.author}>` + '\n\n> **Contenido:**'  + `${msg.content}`)
        if(msg.image) embed.setImage(msg.image)
        message.channel.send({ embeds: [embed] })
    }
}
