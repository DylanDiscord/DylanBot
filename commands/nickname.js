const Discord = require("discord.js");

module.exports = {
  name: "nickname",
  aliases : ['nickname'],
  description: "Changes the user nickname",
  usage: "<member: Member> [...nickname: String]",
  aliases: ['nick', 'name', 'user'],

  run: async (client, message, args) => {

    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("✖️ **¡No tienes suficientes permisos para usar este comando!**")
    if(!args[0]) {
      message.channel.send("No se proporciona un usuario");
      return;
    }
    
    let member;
    try {
        member = message.mentions.members.first() || await message.guild.members.fetch({ user: args[0], force: true });
    } catch {
        message.channel.send('Por favor, introduzca un usuario válido')
        return;
    }

    if (!member) return message.reply("Por favor, especifique un miembro!");

    const apodo = args.slice(1).join(" ");

    if (!apodo) {
        try {
            member.setNickname(null);

            message.channel.send(`Apodo de **${member.user.tag}** se ha restablecido`)

          } catch (err) {
            console.log(err);
          }
    }

    if (apodo) {
      try{
      member.setNickname(apodo)
      
      message.channel.send(`Apodo establecido en \`${apodo}\`.`)




    } catch (error) {
      console.log(error);

    }
}
  }
}