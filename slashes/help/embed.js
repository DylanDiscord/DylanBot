const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Crea un mensaje embed custom")
    .addChannelOption(option => option .setName("canal").setDescription("canal a mandar el embed").setRequired(true))
    .addStringOption(option => option .setName("titulo").setDescription("Titulo a poner").setRequired(true))
    .addStringOption(option => option .setName("descripcion").setDescription("descripcion a poner").setRequired(true))
    .addStringOption(option =>
		option.setName('color')
			.setDescription('Color a poner')
			.setRequired(true)
			.addChoices(
				{ name: 'Rojo', value: 'RED' },
				{ name: 'Verde', value: 'GREEN' },
				{ name: 'Amarillo', value: 'YELLOW' },
                { name: 'Aqua', value: 'AQUA' },
			)),
       async execute(client, interaction) {
        const canal = interaction.options.getChannel("canal")
        const titulo = interaction.options.getString("titulo") 
        const descripcion = interaction.options.getString("descripcion")
        const color = interaction.options.getString("color")

        const embed = new Discord.MessageEmbed()
        .setTitle(`${titulo}`)
        .setDescription(`${descripcion}`)
        .setColor(`${color}`)
        
        if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "No tengo suficientes permisos", ephemeral: true})
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "No tienes suficientes permisos", ephemeral: true})


        let m = await canal.send({ embeds: [embed] })
        interaction.reply({ content: `El embed se ha creado correctamente en el canal ${canal}`, ephemeral: true })
    } 
}