const Discord = require ("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Haz una encuesta en el servidor")

    .addChannelOption(o => o.setName("canal").setDescription("el canal donde enviaras la encuesta").setRequired(true))
    .addStringOption(o => o.setName("pregunta").setDescription("la pregunta de la encuesta").setRequired(true)),

   /** 
   *
   *@param {Discord.Client} client
   *@param {Discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    
    const pregunta = interaction.options.getString("pregunta")
    const canal = interaction.options.getChannel("canal")

    let embed = new Discord.MessageEmbed()
    .setTitle(`Nueva Encuesta`)
    .setDescription(`> ${pregunta}\n\n\`\`\`✅ Si\`\`\`\n\n\`\`\`❌ No\`\`\``)
    .setFooter(`Encuesta creada por: ${interaction.user.tag}`)
    .setTimestamp()
    .setColor("AQUA")

    if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "No tengo suficientes permisos", ephemeral: true})
    if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "No tienes suficientes permisos", ephemeral: true})

    let m = await canal.send({ embeds: [embed] })

    if(embed) m.react("✅")
    if(embed) m.react("❌")

    interaction.reply({ content: `Encuesta creada en ${canal}!`, ephemeral: true})
  }
}