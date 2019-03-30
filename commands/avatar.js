module.exports = {
	name: 'avatar',
	description: `Displays a bunch of Fire Lord propaganda! There's no way it's true!`,
	execute(message, args) {
		if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
        }
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
        });
        
        message.channel.send(avatarList);
            
	},
}
