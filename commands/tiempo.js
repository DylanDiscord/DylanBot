const { Message, Client, MessageEmbed } = require("discord.js");
const weather = require("weather-js")
module.exports = {
    name: "tiempo",
    aliases: ["weather"],
    description: 'weather info',
    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
let city = args.join(" ");
    if(!city) {
        return msg.channel.send('Por favor, proporcione alguna ciudad!');
    }

    weather.find({ search: city, degreeType: "C" }, function (err, result) {

        if (err) return msg.channel.send(err);
        if(!args[0]) return msg.channel.send('Porfavor, especifica una localizacion!')

        if(result === undefined || result.length === 0) return msg.channel.send('Localizavion invalida!')

        var current = result[0].current;
        var location = result[0].location;

        const weatherembed = new MessageEmbed()
        .setColor('AQUA')
        .setAuthor(`Previsión meteorológica para ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setDescription(`**${current.skytext}**`)
        .addField('Zona horaria', `UTC ${location.timezone}`, true)
        .addField('Tipo de titulación', 'Celsius', true)
        .addField('Temperatura', `${current.temperature}˚`, true)
        .addField('Viento', `${current.winddisplay}`, true)
        .addField('Se siente como', `${current.feelslike}˚`, true)
        .addField('Humedad', `${current.humidity}%`, true)
        msg.channel.send({ embeds: [weatherembed] })

        })
    }
}