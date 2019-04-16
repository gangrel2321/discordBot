/*
possible features:
generate pinned messages
urban dictionary
burp detector

//if bot gets mentioned (insert random septimus quote)
*/

//require the discord.js module
const fs = require('fs');
const Discord = require('discord.js');

//const config = require('./config.json')
const { prefix, tokVal } = require('./config.json');

//create new discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

//dynamically retrieve command files, The fs.readdirSync() method will return an array of all the file names in that directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

//when the client is ready run this
//this only triggers once after logging in
client.once('ready', () => {
	console.log('Running...');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if(!command) return;

    if(command.guildOnly && message.channel.type !== 'text'){
        return message.reply('That command can only be executed on a server!');
    }

    if(command.args && !args.length) {
        let reply = `Missing required arguments, ${message.author}`;
        
        if(command.usage){
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }
    
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const curTime = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (curTime < expirationTime) {
			const timeLeft = (expirationTime - curTime) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, curTime);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


//log in
client.login(tokVal);