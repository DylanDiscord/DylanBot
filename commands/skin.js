const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'skin',
  alias: [],
  run: async (client, message, args) => {
    const skin = args[0];
    if(!skin) return message.reply({
      embeds: [new MessageEmbed()
            .setDescription(`**Escribe el nombre de la skin que deseas buscar!**`)
            .setColor("RED")
        ]
    })

    let url = `https://minecraftskinstealer.com/api/v1/skin/render/fullbody/${skin}/700`;

    const embed = new(require('discord.js')).MessageEmbed()
    .setTitle(`Skin de usuario: ${skin}`)
    .setImage(url)
    .setColor("RANDOM");

    message.reply({ embeds: [embed] });
  }
}