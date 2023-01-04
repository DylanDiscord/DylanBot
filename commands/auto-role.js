const { Permissions } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: "autorole",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.channel.send({
      emebds: [new MessageEmbed()
        .setColor("RED")
        .setDescription("No tienes los permisos suficientes!\nPermisos faltantes : `MANAGE_ROLES`")
      ]
    })

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) return message.channel.send(`Menciona a un rol`)

    await db.set(`autorole-${message.guild.id}`, role.id);
    message.reply(`Ahora cada persona que entre se le dara el rol ${role.name} !`)
  }
}