const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "add-role",
    aliases: ["ar"],
    usage: "add-role [@USUARIO] [@ROL]",
    permisos: ["MANAGE_ROLES"],
  permisos_bot: ["ADMINISTRATOR"],
    run: async (client, message, args) => {

        if(!message.member.permissions.has("ADMINISTRATOR"))return message.reply({
          emebds: [new MessageEmbed()
            .setColor("RED")
            .setDescription("No tienes los permisos suficientes! :pensive:\nPermisos faltantes : `ADMINISTRATOR`")
          ]
        })
        if(!message.guild.me.permissions.has("ADMINISTRATOR"))return message.reply("No tengo los permisos suficientes! :cry:\nPermisos faltantes : `ADMINISTRATOR`")

  
          const target = message.mentions.members.first()
          if(!target) return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`**Debes Mencionar un usuario!**`)
                .setColor("RANDOM")
            ]
          }) 
          const role = message.mentions.roles.first()
          if(!role) return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`**Debes Mencionar un rol!**`)
                .setColor("RANDOM")
            ]
          })
  
          await target.roles.add(role)
          message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`Rol añadido correctamente a ${target.user.username}`)
                .setColor("RANDOM")
            ]
          })
      }
  }