const Discord = require("discord.js");
const {Client, MessageEmbed, ButtonInteraction, MessageActionRow} = require("discord.js");
module.exports = {
    name: "help",
    run: async(client, message, args) => {

        const LinkRow = new Discord.MessageActionRow()
    .addComponents(
        [
            new Discord.MessageButton()
            .setStyle("SUCCESS")
            .setLabel("MODERACION")
            .setCustomId("mod")
            .setEmoji("🛡️")
        ],
        [
            new Discord.MessageButton()
            .setStyle("SUCCESS")
            .setLabel("ADMINISTRACION")
            .setCustomId("admin")
            .setEmoji("🔰")
        ],
        [
            new Discord.MessageButton()
            .setStyle("SUCCESS")
            .setLabel("ECONOMIA")
            .setCustomId("eco")
            .setEmoji("💸")
        ],
        [
            new Discord.MessageButton()
            .setStyle("SUCCESS")
            .setLabel("ACCIONES")
            .setCustomId("acc")
            .setEmoji("😄")
        ],

    )
    let row = new Discord.MessageActionRow()
    .addComponents (
        [
            new Discord.MessageButton()
            .setStyle("SUCCESS")
            .setLabel("DIVERSION")
            .setCustomId("diver")
            .setEmoji("🤣")
        ],
        [
            new Discord.MessageButton()
            .setStyle("SUCCESS")
            .setLabel("UTILIDAD")
            .setCustomId("ud")
            .setEmoji("⚙️")
        ],
        [
            new Discord.MessageButton()
            .setStyle("SUCCESS")
            .setLabel("PREMIUM")
            .setCustomId("pm")
            .setEmoji("💎")
        ],
        [
            new Discord.MessageButton()
            .setURL("https://discord.gg/rPVmYjzqKd")
            .setStyle("LINK")
            .setLabel("SOPORTE")
            .setEmoji("🛠️")
        ]
    )
    // Mensaje de ayuda
        let embed = new Discord.MessageEmbed() 
        .setTitle("Menu de ayuda de Dylan")
        .setDescription(`\`👋\`┇ Hola ${message.author.tag} estas en el menu de ayuda de dylan\n\n \`\🌟\`┇ Hola soy Dylan, un Bot multifunciones que te ayudara a hacer de tu server algo mas Fácil\n\n \`\💖\`┇ Estoy en \`\`${client.guilds.cache.size}\`\` Servidores y un total de \`\`${client.users.cache.size}\`\` miembros \n\n \`\`⚙️\`\`┇ Cuento con \`\`82\`\` comandos para probar\n\n \`\`🌐\`\`┇ Todos mis comandos estan bien explicados en mi [Documentación](https://dylandcs.gitbook.io/untitled/) \n\n \`\`🗳️\`\`┇ Puedes Votar por en [DCBotList](https://discordbotlist.com/bots/dylan/upvote) o en [Top.GG](https://top.gg/bot/994667997320978553) y me ayudas a poder ser mas conocido`)
          .setImage("https://cdn.discordapp.com/attachments/1022949540921348156/1036390043704631347/standard_2.gif")
          .setFooter(`Hecho con amor, de parte de DinoGG ❤`)
         .setColor("AQUA")
        //comandos de Moderación
         let mod = new Discord.MessageEmbed()
         .setAuthor({ name: `Bienvenido ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
         .setDescription(" ```d!warn (usuario)(razón)\nd!unwarn (usuario)(razón)\nd!ban (usuario)(razón)\nd!unban (id)\nd!kick (usuario) (razón)\nd!clear (cantidad)\nd!snipe\nd!nuke ``` ")
         .setColor("AQUA")
         //comandos de administración
         let ad = new Discord.MessageEmbed()
         .setAuthor({ name: `Bienvenido ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
         .setDescription(" ```d!poll (encuesta)\nd!setsugg (canal)\nd!autorole (rol)\nd!setconfesion (canal)\nd!lock\nd!unlock\nd!lockall\nd!unlockall\nd!user-info (usuario)\nd!welcome channel (id del canal)\nd!welcome message (mensaje)``` ")
         .setColor("AQUA")
         //comandos de economia
         let eco = new Discord.MessageEmbed()
         .setAuthor({ name: `Bienvenido ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
         .setDescription(" ```d!work\nd!balance\nd!daily\nd!monthly``` ")
         .setColor("AQUA")
         //comandos de acciones
         let acc = new Discord.MessageEmbed()
         .setAuthor({ name: `Bienvenido ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
         .setDescription(" ```d!kiss (usuario)\nd!hug (usuario)\nd!slap (usuario)\nd!sleep``` ")
         .setColor("AQUA")
         //comandos de Diversion
         let dv = new Discord.MessageEmbed()
         .setAuthor({ name: `Bienvenido ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
         .setDescription(" ```d!borracho\nd!meme\n/8ball (pregunta)\nd!snake\nd!tictactoe (usuario)\nd!hangman``` ")
         .setColor("AQUA")
         //Comandos de Utilidad
         let ud = new Discord.MessageEmbed()
         .setAuthor({ name: `Bienvenido ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
         .setDescription(" ```d!reseña (puntuacion 1 - 5)(reseña)\nd!calcular (#)+-(#)\nd!tiempo (ciudad)(localizacion)``` ")
         .setColor("AQUA")
         //comanods Premiums
         let pm = new Discord.MessageEmbed()
         .setAuthor({ name: `Bienvenido ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
         .setDescription(" ```d!setprefix (prefix)\nd!translate (lenguaje)(texto)\nd!nickname (usuario)(nick)``` ")
         .setFooter("Mas comandos mas adelante")
         .setColor("AQUA")
        //Apartado de los botones 
         let m = await message.channel.send({ embeds: [embed], components: [LinkRow, row] })
         const filtro = i => i.user.id === message.author.id;

         const collector = m.createMessageComponentCollector({ filter: filtro, time: 60000 })
         collector.on('collect', async i => {
            if(i.customId === 'mod'){
                await i.deferUpdate()
			i.editReply({ embeds: [mod] , components: [LinkRow, row] })
            }})
            collector.on('collect', async i => {
                if(i.customId === 'admin'){
                    await i.deferUpdate()
                i.editReply({ embeds: [ad] , components: [LinkRow, row] })
                }})
                collector.on('collect', async i => {
                    if(i.customId === 'eco'){
                        await i.deferUpdate()
                    i.editReply({ embeds: [eco] , components: [LinkRow, row] })
                    }})
                    collector.on('collect', async i => {
                        if(i.customId === 'acc'){
                            await i.deferUpdate()
                        i.editReply({ embeds: [acc] , components: [LinkRow, row] })
                        }})
                        collector.on('collect', async i => {
                            if(i.customId === 'diver'){
                                await i.deferUpdate()
                            i.editReply({ embeds: [dv] , components: [LinkRow, row] })
                            }})
                            collector.on('collect', async i => {
                                if(i.customId === 'ud'){
                                    await i.deferUpdate()
                                i.editReply({ embeds: [ud] , components: [LinkRow, row] })
                                }})
                                collector.on('collect', async i => {
                                    if(i.customId === 'pm'){
                                        await i.deferUpdate()
                                    i.editReply({ embeds: [pm] , components: [LinkRow, row] })
                                    }})
                            
    }
    
        
}
        
