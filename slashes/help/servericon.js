const { EmbedBuilder, PermissionsBitField, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders") 


module.exports = {
  data: new SlashCommandBuilder()
    .setName("servericon") //nombre del comando
    .setDescription("Mira el ícono del servidor."),
    
    async execute(client, interaction) {

        const svicon = new MessageEmbed()
            .setImage(interaction.guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
            .setColor("GREEN")
            .setFooter({ text: `Pedido por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

        interaction.reply({ embeds: [svicon]})

    }
}