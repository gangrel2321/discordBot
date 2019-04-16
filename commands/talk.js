const fs = require('fs')
//add filtering for bot messages and ! messages and ?url messages?
module.exports = {
	name: 'talk',
    description: `The boy speaks.`,
    cooldown: 2,
	execute(message, args) {
        const path = './textGeneration/generated_1.txt'
        var chunk;
        fs.readFile(path, (err, data) => 
        {
            if(err) throw err;
            data = data + '';
            data = data.split('\n');
            var sender = data[Math.floor(Math.random()*data.length)];
            while(sender.indexOf('<@' > -1) && sender.length < 24)
            {
                sender = data[Math.floor(Math.random()*data.length)];
            }
            message.channel.send(sender);  
        });
	},
}