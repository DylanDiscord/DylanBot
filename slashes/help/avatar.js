const { SlashCommandBuilder } = require("@discordjs/builders"); // Builder para el slash command
const { MessageEmbed } = require('discord.js'); // Constructor del messageEmbed.


const data = new SlashCommandBuilder() 
.setName("avatar") // Seteamos name del command
.setDescription("Mira el avatar de un usuario.") // Description del comando.
.addUserOption(option => 
  option
    .setName('usuario') 
    .setDescription('El usuario del cual sacare el avatar') 
    .setRequired(false) 
);
module.exports = { 
  name: "avatar", 
  async execute (client, interaction) {
    const user = interaction.options.getUser('usuario') || interaction.user; // Soliciatmnos la interaction del usuario, y hacemos que tambien de el avatar del usuario en caso de no mencionar a algun bastardo.

    await interaction.reply({ embeds: [ // Mandamos el mensaje, y de paso el embed.
        new MessageEmbed()
        .setTitle(`Avatar de ${user.tag}`) // Menciona el tag del usuario del que saco el avatar
        .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 })) // El avatar, dinamico true y con tamaño 2048
        .setColor('GREEN') // Color verde
        .setTimestamp() // Timestamp en que se uso el cmd.
        .setFooter({ text: `Solicitado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`}) // Fuiter informando quien lo solicitó y el avatar del que lo solicitó.
      ]
    });
  }, data
};