module.exports = {
	name: 'pinned',
	description: `Displays a random pinned message.`,
	execute(message, args) {
        message.channel.fetchPinnedMessages().then(messages => 
            {
                let pinned = messages.array();
                if(pinned.length)
                {
                    message.channel.send(pinned[Math.floor(Math.random() * pinned.length)].content);
                }
                else {
                    message.channel.send(`There are no pinned messages in this channel.`);
                }
            });
	},
}
