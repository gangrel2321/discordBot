module.exports = {
    name: 'server',
    description: 'Prints... uh, server stuff',
    guildOnly: true,
	execute(message, args) {
		message.channel.send(`Providing Server Info...\nName: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);    
	},
}