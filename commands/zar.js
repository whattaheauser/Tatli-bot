const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const dice = Math.floor(Math.random() * 6) + 1;

    const diceEmbed = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag)
        .setColor("#FFC0CB") // Pink color
        .setTimestamp()
        .setDescription(`**Yazı tura attın ve ${dice} geldi** :game_die:`)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

    message.reply({ embeds: [diceEmbed] });
};

module.exports.help = {
    name: "zarat",
    description: "Zar atar",
};
