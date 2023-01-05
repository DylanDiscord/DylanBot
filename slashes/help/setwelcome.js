const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setwelcome")
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

        db.set(`setwelcome_${interaction.guild.id}`)
        db.set(`setwelcome_t_${interaction.guild.id}`, titulo)
        db.set(`setwelcome_d_${interaction.guild.id}`, descripcion)
        db.set(`setwelcome_c_${interaction.guild.id}`, color)

        if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "No tengo suficientes permisos", ephemeral: true})
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "No tienes suficientes permisos", ephemeral: true})

        interaction.reply({ content: `El embed se ha creado correctamente en el canal ${canal}`, ephemeral: true })
    } 
}