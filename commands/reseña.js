const Discord = require('discord.js');

module.exports = {
    name: "reseña",
    owner: true,

    run: async(client, message, args) => {

        const row = new Discord.MessageActionRow()
	 .addComponents(
		[
		 new Discord.MessageButton()
         .setURL("https://discord.gg/rPVmYjzqKd")
		  .setStyle('LINK')
		  .setLabel('Servidor')
		  .setEmoji('<a:_:1057387093766180884>')
		],
        [
            new Discord.MessageButton()
         .setURL("https://discord.gg/rPVmYjzqKd")
         .setStyle('LINK')
         .setLabel('Top.GG')
         .setEmoji('<:_:1039897753351897138>')
       ]
        
     )

        let puntuacion = args[0] 
        if(isNaN(puntuacion)) return message.channel.send("Solo puedes especificar un numero del 1 al 5")
        if(!puntuacion) return message.channel.send(`⭐ **${message.author.username}**, Debes de escribir una puntuación\nMax: 5`);
        let mensaje = args.slice(1).join(" ")
        if(!mensaje) return message.channel.send(`⭐ **${message.author.username}**, Debes de colocar un reseña`)
        if(puntuacion > 5) return message.reply(`La reseña no puede superar los 5 puntos.`)
        if(puntuacion < 1) return message.reply(`La reseña no puede superar los 5 puntos.`)

        const reseña = new Discord.MessageEmbed()
        .setAuthor({ name: `Enviada por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTitle("Una nueva reseña se ha enviado al servidor:")
        .addFields([
            { name: `__Reseña__`, value: `\`${mensaje}\`` },
            { name: `__Puntuación__`, value: `\`${puntuacion.toString()
            .replace(/1/, "⭐")
            .replace(/2/, "⭐⭐")
            .replace(/3/, "⭐⭐⭐")
            .replace(/4/, "⭐⭐⭐⭐")
            .replace(/5/, "⭐⭐⭐⭐⭐")
        }\`` }
        ])
        .setColor("YELLOW")
        .setFooter({ text: `Enviada desde ${message.guild.name} por ${message.author.username}`})

        client.channels.cache.get("1057412958973595738").send({ embeds: [reseña] })
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: "Reseña enviada correctamente!", iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`**Hey ${message.author.tag} tu reseña ha sido enviada correctamente \nal servidor de soporte de Dylan\nSi quieres ir a checarla dale al Boton de abajo**.`)
       .setColor("GREEN")
        await message.channel.send({ embeds: [embed], components: [row]})
}}