const Discord = require('discord.js');

module.exports = {
    name: "reporte",
    aliases: ["reportar"],

    run: async (client, message, args) => {

        mensaje = args.join(' ');

        if (!args[0]) return message.reply("`⚠️ Especifique el error.`");

        if (args[0] === 'bug') return message.reply("`⚠️ Especifique el error.`");

        message.reply("✅ Gracias por enviar tu reporte");

        message.channel.createInvite({ maxAge: 0, MaxUses: 5 }).then(link => {

                const reporte = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} [${message.author.id}]`)
                .addField(`Reporte:`, `${mensaje}`)
                .addField(`Desde el servidor:`, `${message.guild.name} - ${message.guild.id}`)
                .setColor("RANDOM")
                .addField(`Invitación`, `${link}`)
                .setFooter({ text: `${message.author.tag}`, iconURL: message.guild.iconURL ({ dynamic: true }) })
                .setTimestamp()

            client.users.cache.get("831683895631020112").send({ embeds: [reporte] });

        });

    }
}