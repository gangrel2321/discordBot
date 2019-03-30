const fs = require('fs')
module.exports = {
	name: 'allocate',
	description: `Loads current text for learning.`,
	execute(message, args) {
        var lastId = message.channel.lastMessageID
        var done = 0
        while(!done)
        {
            done = message.channel.fetchMessages( { limit : 10, before: lastId} ).then(messages => 
                {
                    //console.log(`Done: ${done}`);
                    if(!messages.size) { return 1;};
                    //add save to sql database later
                    let file = fs.createWriteStream('messageTrain.txt');
                    file.on('error', err => { console.log(`Error opening training file.`)});
                    let data = messages.array();
                    data.sort( (a,b) => { return a.createdAt < b.createdAt ? -1 : 1; });
                    data.forEach(mess => { file.write(`${mess.content}\n`); });
                    file.end();
                    if(data.length) lastId = data[0].id;
                    else { return 1;};
                    console.log(`Logged ${messages.size} messages`);
                    return 0;
                }
            );
            console.log(`Done: ${done}`);
        }
        
	},
}
