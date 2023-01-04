const Discord = require('discord.js');

module.exports = {
  name: "dormir", // Nombre del comando
  alias: [], // Alias del comando
  run: async (client, message, args) => {

    let gifs = [
        "https://nekocdn.com/images/Y4_zbL2j.gif",
        "https://nekocdn.com/images/bZO8JPuE.gif",
        "https://nekocdn.com/images/UiHZmxit.gif",
        "https://i.pinimg.com/originals/f1/5e/3e/f15e3e84c6fc6ef01419fa7fab86b571.gif"
      ] // definimos todos los gif posibles

      let dormir = gifs[Math.floor(Math.random() * gifs.length)]; // elegimos un gif al azar

    const embed = new Discord.MessageEmbed() // creamos el embed
    .setDescription(`${message.author.tag} esta durmiendo..`) // descripcion
    .setImage(`${dormir}`) // gif
    .setFooter(`${message.author.tag} Tiene Ganas De Mimir`) // pie del embed / footer
    .setColor("RANDOM")
    

    message.reply({ embeds: [embed] })

  }
}