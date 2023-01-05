const Discord = require("discord.js");
const client = new Discord.Client({
    intents: ["DIRECT_MESSAGES","DIRECT_MESSAGE_REACTIONS","DIRECT_MESSAGE_TYPING","GUILDS","GUILD_BANS","GUILD_EMOJIS_AND_STICKERS","GUILD_INTEGRATIONS","GUILD_INVITES","GUILD_MEMBERS","GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_MESSAGE_TYPING", "GUILD_PRESENCES" ]
});
const data = require("./data.json");
const { Client, MessageEmbed  } = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap")
const { Message } = require("discord.js");
const { config } = require("process");
const { arg } = require("mathjs");
const db = require("quick.db");
const mongoose = require("mongoose");
const ms = require("ms");

var prefix = data.prefix;

client.comandos = new Discord.Collection();

let archivos = fs.readdirSync("./commands/").filter((f) => f.endsWith(".js"));

for (var archi of archivos) {
  let comando = require("./commands/" + archi)
  client.comandos.set(comando.name, comando)
}


client.on(`ready`, async (ready) => {
    const estados = [
        {
            tipo: "PLAYING",
            contenido: "📛 Moderar Servidores 📛",
            opcionesestados: "dnd" 
        },
        {
            tipo: "WATCHING",
            contenido: ` 👀 ${client.guilds.cache.size} Servers 👀 `,
            opcionesestados: "on"
        },
        {
            tipo: "PLAYING",
            contenido: "❗ El mejor Bot ❗",
            opcionesestados: "idle"
        },
        {
            tipo: "PLAYING",
            contenido: "🔰 d!help para ayudarte 🔰",
            opcionesestados: "idle"
        },
    ];

    async function activarestados() {
        const estado = Math.floor(Math.random() * estados.length); 

        try {
            await client.user.setPresence({
                activities: [
                    {
                        name:estados[estado].contenido,
                        type:estados[estado].tipo
                    },
                ],
                status:estados[estado].opcionesestados
            });
            
        } catch (error) {
            console.error(error);
        }
    }
    setInterval(activarestados,10000);
    console.log("🟢 Estados Activos 🟢");
    console.log(" 🟢 Dylan encendido 🟢 ")
});
client.on("messageCreate", async message => {
  if(!db.has(`${message.author.id}-afk`)) return;

  let razon = await db.get(`${message.author.id}-afk`);
 
  message.channel.send({
    embeds: [new MessageEmbed()
      .setTitle(`${message.author.tag}\n\nAFK Removido`)
      .setDescription(`${message.author.tag} **Ahora no estás AFK**\n\n**La razón era:** ${razon}`)
      .setThumbnail(message.author.displayAvatarURL())
      .setColor("GREEN")
      .setTimestamp()
    ]
  });
  db.delete(`${message.author.id}-afk`);
})

client.on("messageCreate", async message => {
      if(message.content.startsWith("d!afk")) {
        const args = message.content.trim().split(/ +/g);
        let razon = args.slice(1).join(` `); 
        if(!razon) {
          razon = `No especificado`;
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag}\n\nAFK Establecido`)
        .setDescription(`${message.author.tag} **Ahora esta AFK**\n\n**Razon:** ${razon}`)
        .setColor("GREEN")
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();

        await db.set(`${message.author.id}-afk`, razon);

        message.channel.send({ embeds: [embed] });
      }
})
client.on("messageCreate", async message => {
  let mencionado = message.mentions.members.first();
  if(!mencionado) return;
  if(db.has(`${mencionado.id}-afk`)) {
    let razon = await db.get(`${mencionado.id}-afk`);
    message.channel.send({
      embeds: [new MessageEmbed()
        .setTitle("AFK")
        .setDescription(`${mencionado.user.tag} **Esta AFK, no lo molestes**\n\n**Razon:** ${razon}`)
        .setColor("RED")
        .setTimestamp()
      ]
    })
  }
})


client.on("messageCreate", async (message) => {

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    
    let = prefix;
    if(db.get(`setprefix_${message.guild.id}`)) {

      prefix = await db.get(`setprefix_${message.guild.id}`)
    } else {
      prefix = "d!"
    }

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    if(db.has(`addblacklist_${message.author.id}`)) return message.channel.send(" Estas Blacklisteado ")
    let cmd = client.comandos.get(command) || client.comandos.find(cmd => cmd.aliases && cmd.aliases.includes(command))
    if (cmd) {
      return cmd.run(client, message, args)
    }
    const cooldowns = new Collection()

   if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;

      return message.channel
        .send(`No puedes usar el comando durante ${Math.round(timeLeft.toFixed(1))} segundos`)
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
  
  
  });
  client.on("messageCreate", async (message, interaction) => {
   
    if(message.content.startsWith("d!setup-tickets")) {
      const canal = message.mentions.channels.first();
      const rol = message.mentions.roles.first();
  
      if(!canal) return message.channel.send("Pon un canal para configurar los tickets")
      if(!rol) return message.channel.send("Menciona un rol para mencionar en los tickets")
  
      db.set(`ticket_rol_${message.guild.id}`, rol.id);
  
      const embed = new Discord.MessageEmbed()
      .setTitle(`Sistema de tickets configurado correctamente!`)
      .setDescription(`El rol establecido es <@&${rol.id}> y el canal es  ${canal}`)
      .setColor("RANDOM")
      
      message.channel.send({ embeds: [embed] });
  
      const embed1 = new Discord.MessageEmbed()
      .setTitle("Tickets")
      .setDescription(`Para abrir un ticket presiona el boton de abajo`)
      .setColor("GREEN")
  
      const boton = new Discord.MessageButton()
      .setCustomId("ticket")
      .setLabel("Abrir ticket")
      .setStyle("SUCCESS")
      .setEmoji("🎫")
  
      const row = new Discord.MessageActionRow()
      .addComponents(boton)
  
      canal.send({ embeds: [embed1], components: [row] })
    }

})
client.on("interactionCreate", async interaction => {
  if(interaction.customId === "ticket") {
    const rol = await db.get(`ticket_rol_${interaction.guild.id}`);
    // await interaction.deferUpdate();
    interaction.guild.channels.create(`ticket-${interaction.member.user.username}`, {
        type: "GUILD_TEXT",
        permissionOverwrites: [
           {
                id: interaction.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
           },
           {
            id: interaction.member.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "READ_MESSAGE_HISTORY"]
           },
           {
            id: rol,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
           }
      ]      
    }).then(async channel => {
      const embed = new Discord.MessageEmbed()
      .setTitle("Ticket")
      .setDescription("> Bienvenido a tu ticket!\n > Espera a que un miembro del staff venga para resolver tu duda")
      .setColor("GREEN")

      const boton = new Discord.MessageButton()
      .setCustomId("cerrar")
      .setLabel("Cerrar Ticket")
      .setStyle("DANGER")
      const row = new Discord.MessageActionRow()
      .addComponents(boton)

      channel.send(`<@${interaction.member.id}>, <@&${rol}>`)
      channel.send({ embeds: [embed], components: [row] })

      await interaction.reply({ content: `Ticket <#${channel.id}> creado correctamente`, ephemeral: true })
    })
  }

  if(interaction.customId === "cerrar") {
    interaction.deferUpdate();
    interaction.channel.delete();
  }
})
      

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.slashes.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: '¡Hubo un error al ejecutar este comando!', ephemeral: true });
	}
});

client.slashes = new Discord.Collection();
const slashFolders = fs.readdirSync('./slashes');
for (const folder of slashFolders) {
const slashFiles = fs.readdirSync(`./slashes/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of slashFiles) {
		const command = require(`./slashes/${folder}/${file}`);
  client.slashes.set(command.data.name, command)
}
}

require("./slashcommands.js")


client.snipes = new Map()
client.on('messageDelete', function(message, channel) {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.id, 
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

client.on("messageDelete", async (message) => {
try {
//Comprobaciones previas
  if (!message.guild || message.author.bot) return;
  if (message.member.permissions.has("ADMINISTRATOR")) return;
  let member = message.mentions.members.first();
  if (member) {
    if (member.id === message.author.id) return;
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`💀 Ping eliminado Detectado`)
          .addFields([
            {
              name: `👨 Autor`,
              value: `${message.author}`,
            },
            {
              name: `📜 Contenido`,
              value: `\`\`\`\n ${message.content.substring(0,2048)} \`\`\``,
            },
          ]),
      ],
    });
  }
} catch{}
});

client.on('guildMemberAdd', async (member) => {
  const role = await db.has(`autorole-${member.guild.id}`);
  if (role === true) {
    member.roles.add(await db.get(`autorole-${member.guild.id}`))
  }
})
client.on("guildMemberRemove", async (member) => {
  let guild = member.guild;
 
      let channel = client.channels.cache.get(await db.get(`farewell_channel_${guild.id}`))
      let farewell_message = await db.get(`farewell_message_${guild.id}`)
      channel.send({content: farewell_message.replace(`%user%`, member.user).replace(`%guild%`, guild.name)}).catch(error => {})})
client.on('guildMemberAdd', async (member) => {
  let guild = member.guild;
 
      let channel = client.channels.cache.get(await db.get(`welcome_channel_${guild.id}`))
      let welcome_message = await db.get(`welcome_message_${guild.id}`)
      channel.send({content: welcome_message.replace(`%user%`, member.user.username).replace(`%user.tag%`, member.user).replace(`%guild%`, guild.name)}).catch(error => {})})

      client.on('guildMemberAdd', async (message, interaction) => {
        let guild = interaction.guild.id;
       
            let channel = client.channels.cache.get(await db.get(`setwelcome_embed_${guild.id}`))
            let titulo = await db.get(`setwelcome_t_${guild.id}`)
            let descripcion = await db.get(`setwelcomed_d${guild.id}`)
            let color = await db.get(`setwelcomec_${guild.id}`)

            const embedwelcome = new Discord.MessageEmbed()
            .setTitle(`${titulo}`)
            .setDescription(`${descripcion}`)
            .setColor(`${color}`)

            channel.send({ embeds: [embedwelcome] })})

client.login(data.token);