const Discord = require("discord.js");
const ms = require('ms');

module.exports.run = async (client, message, args) => {
    if (!args[1]) {
        return message.reply("<a:no:784463793366761532> **Lütfen 2den fazla kelime yaz**");
    }

    let replies = ["Evet", "Hayır", "Ne", "Bida sor!", "Emin değilim","Evet", "Hayır", "Ne", "Bida sor!", "Emin değilim","Evet", "Hayır", "Ne", "Bida sor!", "Emin değilim","Evet", "Hayır", "Ne", "Bida sor!", "Emin değilim", "31" ];
    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");

    let ballembed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)

        .addField("Soru", `**${question}**`)
        .addField("Cevap", `**${replies[result]}**`);

    message.channel.send({ embeds: [ballembed] });
    message.delete();
};

module.exports.help = {
    name: "8ball"
};
