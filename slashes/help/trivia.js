const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const { Trivia } = require("discord-gamecord"); 

module.exports = {
    data: new SlashCommandBuilder()
  .setName("trivia")
  .setDescription("Juega trivia!")
  .addStringOption((option) =>
         option
        .setName('difficulty')
        .setDescription('The difficulty to play with (default: medium)')
		      .addChoices(
        { name: "Easy", value: "easy" },
        { name: "Medium", value: "medium" },
        { name: "Hard", value: "hard" }
      )
        .setRequired(false)
    ),
  async execute (client, interaction) {
	new Trivia({
 message: interaction,
 slash_command: true,
 language: "es",
 embed: {
    title: 'Trivia',
    description: 'Tienes {time} segundos para responder!',
    color: '#00AAAA',
  },
  difficulty: interaction.options.getString("difficulty") || 'medium',
  winMessage: '¡Buen trabajo!, ¡Tu respuesta era correcta! Efectivamente era **{answer}**',
  loseMessage: '¡Su respuesta era Incorrecta! La respuesta correcta era **{answer}**',
  othersMessage: 'No está permitido utilizar botones para este mensaje!',
}).startGame();


  }};
