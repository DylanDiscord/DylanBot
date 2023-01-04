const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const dc = require('discord.js');


module.exports = {
data: new SlashCommandBuilder()
.setName('clear')
.setDescription(' Elimina Mensajes De Un Canal.')
.addIntegerOption(option => option.setName('amount').setDescription('Numeró De Mensajes Para Eliminar.')),
        
async execute(client, interaction) {

      const guild = interaction.guild;

 
     if(!interaction.member.permissions.has("MANAGE_MESSAGES"))return interaction.reply({
        embeds: [new MessageEmbed()
            .setDescription("No tienes suficientes permisos para hacer esto!\nPermisos Faltantes : \`MANAGE_MESSAGES`")
            .setColor("RANDOM")
        ]
    })
    if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES"))return interaction.reply({
        embeds: [new MessageEmbed()
            .setDescription(`**No tengo los permisos suficientes para hacer esto!\nPermisos faltantes \`MANAGE_MESSAGES\`**`)
            .setColor("RED")
        ]
    })

      const amount = interaction.options.getInteger('amount')
      ?? 99;

      const embed3 = new Discord.MessageEmbed()
     .setDescription(`El Valor Para Borrar Mensajes Es Desde 1 Al 99.`)
     .setColor("RED")

     const embed4 = new Discord.MessageEmbed()
     .setDescription(` Se han eliminado  \`${amount}\` mensajes correctamente.`)
     .setColor("GREEN")

      if (amount < 1 || amount > 99) {
         return interaction.reply({ embeds: [embed3], ephemeral: true });
      }

      await interaction.channel.bulkDelete(amount, true).catch(error => {
      console.error(error);
      interaction.reply({ content: 'Se ha producido un error al intentar eliminar los mensajes de este canal.!', ephemeral: true });
      });

      interaction.reply({ embeds: [embed4], ephemeral: true })

      },
      
};