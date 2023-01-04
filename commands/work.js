const db = require("quick.db")
const Discord = require("discord.js")
const { MessageEmbed } = require ("discord.js")
const ms = require("ms")

module.exports = {
    name: "work",
    alias: ["wk"],
    
    run: async (client, message, args) => {
        let amonut = Math.floor(Math.random() * 100) + 1;

        let timeout = 300000

        let trabajos = [
            "Arquitecto", "Prostituto/a", "Programador", "Constructor"
          ] 
    
        let finaltrabajos = trabajos[Math.floor(Math.random() * trabajos.length)] 

        let work = await db.fetch(`work_${message.author.id}`);
        if(!work !== null && timeout - (Date.now() - work) > 0) {
            let time = ms(timeout - (Date.now() - work));

            message.channel.send({
                embeds: [new MessageEmbed()
                    .setDescription(`Espera ${time} para vovler a usar el comando`)
                    .setColor("RED")
                ]
            })
        } else {

        let embed = new Discord.MessageEmbed()
        .setAuthor({ name: "Valio la pena el trabajo!", iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${message.author.tag} trabajo de ${finaltrabajos} y resivio ${amonut}$`)
        .setColor("GREEN")

        message.channel.send({ embeds: [embed] })

        db.add(`money_${message.author.id}`, amonut)
        db.set(`work_${message.author.id}`, Date.now())
        }
    }
    }