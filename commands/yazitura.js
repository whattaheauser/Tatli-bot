const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const n = Math.floor(Math.random() * 2);
    let result = n === 1 ? 'Yazi' : 'Tura';

    const embed = new Discord.MessageEmbed()
        .setTitle("Yazı Tura")
        .setDescription(`**Senin için yazı tura attım, ${message.member}. Ve sonucu: ${result}**`)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp()
        .setColor("#FFC0CB"); // Pink color

    message.channel.send({ embeds: [embed] });
};

module.exports.help = {
    name: "yazitura",
    description: "Flips a coin",
};
