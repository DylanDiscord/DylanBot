const Discord = require('discord.js')

var fuckgif = [
    "https://images-ext-2.discordapp.net/external/kp8Dyl0VmRiMvwfMeeiXD2-B8e-uOt_IiJxcJTWYN1Q/https/78.media.tumblr.com/564a148f54a4d8b77488373742b6cdd0/tumblr_nz97jcbvZo1u9j6sno1_500.gif",
    "https://images-ext-1.discordapp.net/external/VGsV9XfKzq_Af32mUh9K-ZxdvSBfzhHK94ClzLhwFlw/https/78.media.tumblr.com/tumblr_lpma9uoQxw1r0lb4do1_500.gif",
    "https://images-ext-1.discordapp.net/external/jWK0T6kZj3sniFcPKjqUdwCYcDCcl8wfMvMW9--Kij0/https/78.media.tumblr.com/8188ef87c6637f21922117a583d60620/tumblr_nllpz7JEov1u8v4xpo1_400.gif",
    "https://images-ext-1.discordapp.net/external/vs8866UFvjXdVIgCoFr18UctfcYygHlRBTrgUpf6cfM/https/78.media.tumblr.com/0edf05627e530ebe24e7755298c0fd1c/tumblr_npj5hx5NXQ1tsbqefo1_400.gif",
    "https://images-ext-1.discordapp.net/external/DVXrL7VplySwjMiSNUjUU0BNdPHBkLhytUSU6ZpQmLQ/https/78.media.tumblr.com/dffb077fea4e67fd06ec41b04cc8c2d2/tumblr_oic4rz6XFS1v0zp6zo1_400.gif",
    "https://images-ext-1.discordapp.net/external/W1aami1DZm49XRV8cCADqeRagKvBS6aaDjJdkMO4mCQ/https/78.media.tumblr.com/7ff307b321d2a7dc5e551c9a37298c61/tumblr_o2pba7oCh11shq4y0o1_500.gif?width=489&height=406",
    "https://images-ext-2.discordapp.net/external/d_QOpLW92yRQYO28RhS9ywsNYN5jz1eGroANeM2vhTs/https/78.media.tumblr.com/2e53f3aacb9f30eaec02752f1faf2e18/tumblr_o6s87lNObH1shq4y0o1_400.gif"

];
module.exports = {
    name: "fuck",
    run: async (client, message, args) => {

    if(!message.channel.nsfw) {
    return message.channel.send({
        embeds: [new Discord.MessageEmbed()
            .setDescription("<a:warn:997860688947056710> | <:nsfw:1010909001602584617> **Este canal no es nsfw** <:nsfw:1010909001602584617> | <a:warn:997860688947056710>")
            .setColor("RANDOM")
        ]
    })
     }

    let fuck = fuckgif[Math.floor(Math.random() * fuckgif.length)];

    if (!args.length) return message.reply({
        embeds: [new Discord.MessageEmbed()
            .setDescription("| **Tienes que mencionar a alguien!** |")
            .setColor("RANDOM")
        ]
    })
    
    const usuario = message.mentions.users.first()

    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.tag} se ha follado a  ${usuario.tag} `)
    .setImage(`${fuck}`)
    .setFooter({text: `Te gusto ${usuario.tag}?`})
    .setColor("RANDOM")
    

    message.reply({ embeds: [embed] })
    } 
}