const { MessageEmbed, Permissions, DiscordAPIError } = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "warns",
    alias: ["warnings"],

run: async(client, message, args) => {
     
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("✖️ ¡No tienes suficientes permisos para usar este comando!")
        const user = message.mentions.members.first() || message.author;

        let warns = await db.get(`warns_${user.id}`)

        const razon = args.slice(1).join(' ');

        if(warns === null) {
        await db.set(`warns_${user.id}`, 0)
        }

        if(!db.has(`warns_${user.id}`)){
        const embed = new MessageEmbed()
        .setDescription(`Usuario:**${user} **no tiene ningun warns`)
        .setColor("GOLD")

        message.reply({embeds: [embed], allowedMentions: { repliedUser: false }})
        
        } else {
        warns = await db.get(`warns_${user.id}`);
            const embed = new MessageEmbed()
            .setTitle("WARNS")
            .setDescription(`**Usuario:**${user}\n\n **Numero de warns**: ${warns} warns`)
            .setColor("RED")
            .setTimestamp(client.user.displayAvatarURL())

            message.reply({embeds: [embed], allowedMentions: { repliedUser: false }})
        }


    }
}