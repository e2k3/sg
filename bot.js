const Discord = require('discord.js'); //Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes
const client = new Discord.Client();
const db = require("quick.db");
 
const serverStats = {
    guildID: '470153000007237643',
    ticketCategoryID: '589368941307101204'
 
}
 
 
//It's not a command, just send a DM for bot and...
 
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') {
        let active = await db.fetch(`support_${message.author.id}`);
        let guild = client.guilds.get(serverStats.guildID);
        let channel, found = true;
        try {
            if (active) client.channels.get(active.channelID)
                .guild;
        } catch (e) {
            found = false;
        }
        if (!active || !found) {
            active = {};
            channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`)
            channel.setParent(serverStats.ticketCategoryID)
            channel.setTopic(`/complete to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`)
 
            channel.overwritePermissions("465147579517370368", { //Role id (when someone join my server get this role with id <<, i dont know how to change it for @everyone. This will prevent users to see the channel, only admins will see!
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });//Toxic Codes
 
 
 
            let author = message.author;
            const newChannel = new Discord.RichEmbed()//Toxic Codes
                .setColor('RANDOM')
                .setAuthor(author.tag, author.avatarURL)
                .setFooter('Support Ticket Created!')
                .addField('User', author)
                .addField('ID', author.id)
            await channel.send(newChannel);
            const newTicket = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(`Hello, ${author.username}`, author.avatarURL)
                .setFooter('Support Ticket Created!')
            await author.send(newTicket);
            active.channelID = channel.id;
            active.targetID = author.id;
        }
        channel = client.channels.get(active.channelID);//Toxic Codes
        const dm = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(`Thank you, ${message.author.username}`, message.author.avatarURL)
            .setFooter(`Your message has been sent - A staff member will be in contact soon.`)//Toxic Codes
        await message.author.send(dm);
        if (message.content.startsWith(prefix + 'complete')) return;
        const embed5 = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(message.content)
            .setFooter(`Message Received - ${message.author.tag}`)
        await channel.send(embed5);
        db.set(`support_${message.author.id}`, active);
        db.set(`supportChannel_${channel.id}`, message.author.id); //Toxic Codes
        return;
    }
    let support = await db.fetch(`supportChannel_${message.channel.id}`); //Toxic Codes
    if (support) {
        support = await db.fetch(`support_${support}`);
        let supportUser = client.users.get(support.targetID);
        if (!supportUser) return message.channel.delete();
        if (message.content.toLowerCase() === '/complete') { //Toxic Codes
            const complete = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(`Hey, ${supportUser.tag}`, supportUser.avatarURL)
                .setFooter('Ticket Closed -- Toxic Codes')
                .setDescription('*Your ticket has been marked as complete. If you wish to reopen it, or create a new one, please send a message to the bot.*')
            supportUser.send(complete);
            message.channel.delete();
            db.delete(`support_${support.targetID}`);
            let inEmbed = new Discord.RichEmbed()
                .setTitle('Ticket Closed!')
                .addField('Support User', `${supportUser.tag}`)
                .addField('Closer', message.author.tag)
                .setColor('RANDOM')
            const staffChannel = client.channels.get('489156917092941826'); //Create a log channel and put id here
            staffChannel.send(inEmbed); //Toxic Codes
        }
        const embed4 = new Discord.RichEmbed() //Toxic Codes
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setFooter(`Message Received - Toxic Codes`)
            .setDescription(message.content)
        client.users.get(support.targetID)
            .send(embed4);
        message.delete({
            timeout: 10000
        }); //Toxic Codes
        embed4.setFooter(`Message Sent -- ${supportUser.tag}`) //Toxic Codes
            .setDescription(message.content); //Toxic Codes
        return message.channel.send(embed4); //Toxic Codes
    }

client.login(process.env.BOT_TOKEN);
