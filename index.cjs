    const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const discord = require("discord.js");
const botConfig = require("./botConfig.json");
const ascii = require("ascii-table");
const table = new ascii("Commands");
table.setHeading("Command", "Status");
const fs = require("fs");

const { HfInference } = require('@huggingface/inference');


// Import the Bum.js module
const bum = require("./commands/Bum");

const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a | b, 0) });
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.help.name, command);
    if (file) {
        table.addRow(file, "✅");
    } else {
        table.addRow(file, "❌");
    }
}
console.log(table.toString());
client.once("ready", () => {
    console.log(`TaTlİ BoT Açık✅✅✅✅✅`);
});

client.on("messageCreate", async message => {


    var prefix = botConfig.prefix;
    var messageArray = message.content.split(" ");
    var command = messageArray[0];

    // Command processing for prefix commands
    if (message.content.startsWith(prefix)) {
        var commandData = client.commands.get(command.slice(prefix.length));
        if (!commandData) return;

        var arguments = messageArray.slice(1);
        try {
            await commandData.run(client, message, arguments);
        } catch (error) {
            console.log(error);
            var errorEmbed = new discord.MessageEmbed()
                .setDescription(`tatlilaş`);
            await message.reply({ embeds: [errorEmbed] });
        }
    }

    // Create a new channel named 'tatli bot' if it doesn't already exist
    if (message.content === "!tatlilaş") {
        try {
            const existingChannel = message.guild.channels.cache.find(channel => channel.name === "tatli bot");
            if (!existingChannel) {
                const channel = await message.guild.channels.create("tatli bot", {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id: message.guild.roles.everyone,
                            deny: ["SEND_MESSAGES"]
                        }
                    ],
                });

                await channel.send({ content: "burda benimle konuşabilirsiniz https://tenor.com/view/%EB%AA%A8%EB%AA%A8%EB%83%A5-%EB%AA%A8%EB%AA%A8%EC%B0%8C-%EB%AA%A8%EC%B0%8C-%EC%95%88%EB%85%95-%ED%82%A4%EC%8A%A4-%EB%AA%A8%EB%AA%A8%EB%83%A5-%EB%AA%A8%EB%AA%A8%EC%B0%8C-gif-10492809875340007712" });
            } else {
                await message.reply("The 'tatli bot' channel already exists.");
            }
        } catch (error) {
            console.log(error);
            var errorEmbed = new discord.MessageEmbed()
                .setDescription(`Error creating channel or sending message.`);
            await message.reply({ embeds: [errorEmbed] });
        }
    }

    // Send a message in the 'tatli bot' channel
    if (message.content === "!komutlar") {
        try {
            const existingChannel = message.guild.channels.cache.find(channel => channel.name === "tatli-bot");
            if (existingChannel) {
                await existingChannel.send({ content: "Geliştiriciler üşengeç olduğu için şuanlık bomboş 🗑️" });
            } else {
                await message.reply("TATLI BOT KANALINI KURMAMIŞSINIZ!!1!!1 !tatlilaş yazın");
            }
        } catch (error) {
            console.log(error);
            var errorEmbed = new discord.MessageEmbed()
                .setDescription(`Error sending message in 'tatli bot' channel.`);
            await message.reply({ embeds: [errorEmbed] });
        }
    }

    // Delete every channel named 'fortnite-konuşma' or 'tatli-bot'
    if (message.content === "!!!!TEMİZLE") {
        try {
            const channelsToDelete = message.guild.channels.cache.filter(channel =>
                channel.name === "fortnite-konuşma" || channel.name === "tatli-bot"
            );

            if (channelsToDelete.size === 0) {
                await message.reply("No channels named 'fortnite-konuşma' or 'tatli-bot' found.");
            } else {
                channelsToDelete.forEach(channel => channel.delete());
                await message.reply("Channels 'fortnite-konuşma' and 'tatli-bot' have been deleted.");
            }
        } catch (error) {
            console.log(error);
            var errorEmbed = new discord.MessageEmbed()
                .setDescription(`Error deleting channels.`);
            await message.reply({ embeds: [errorEmbed] });
        }
    }

    if (message.content === "!!!!TEMIZLE_ROLES") {
        try {
            const rolesToDelete = message.guild.roles.cache.filter(role => role.name.includes("NUKED"));

            if (rolesToDelete.size === 0) {
                await message.reply("No roles with 'NUKED' in their name found.");
            } else {
                rolesToDelete.forEach(role => role.delete());
                await message.reply("Roles with 'NUKED' in their name have been deleted.");
            }
        } catch (error) {
            console.log(error);
            var errorEmbed = new MessageEmbed()
                .setDescription(`Error deleting roles.`);
            await message.reply({ embeds: [errorEmbed] });
        }
    }

    // Run Bum.js 50 times on !!!!NUKE command
    if (message.content === "patlatma zamanı :)") {
        try {
            for (let i = 0; i < 20; i++) {
                await client.commands.get("nuke").run(client, message, []);
            }
            await message.channel.send("BOOOM! PATLADI! 💣💥");
            await message.delete(); // Deletes the original message
        } catch (error) {
            console.log(error);
            const errorEmbed = new Discord.MessageEmbed()
                .setDescription("Bir hata oluştu. Lütfen geliştirici ile iletişime geçin.")
                .setColor("#FF0000"); // Red color for error

            await message.reply({ embeds: [errorEmbed] });
        }
    }
    if(message.content === "!8topu"){
        console.log("HHE")
        let replies = ["Yes", "No", "I don't know", "Ask again later!", "I am not sure!"];
        let result = Math.floor((Math.random() * replies.length));
        let question = args.join(" ");

        let ballembed = new discord.MessageEmbed()
            .setAuthor(message.author.username)

            .addField("Soru", `**${question}**`)
            .addField("Cevap", `**${replies[result]}**`);

        message.channel.send({ embeds: [ballembed] });
        message.delete();
    }
});

client.login(process.env.token);
