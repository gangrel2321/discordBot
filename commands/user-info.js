module.exports = {
	name: 'user-info',
	description: 'Retrieve info on a particular user.',
	execute(message, args) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
}