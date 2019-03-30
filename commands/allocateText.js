const fs = require('fs')
//add filtering for bot messages and ! messages and ?url messages?
module.exports = {
	name: 'allocate',
	description: `Loads current text for learning.`,
	execute(message, args) {
        var lastId = message.channel.lastMessageID
        const fs = require('fs')
        const path = './messageTrain.txt'
        try {
            if (fs.existsSync(path))
                fs.writeFile('messageTrain.txt', '', (err) => { if(err) throw err; });
            else fs.closeSync(fs.openSync('./messageTrain.txt', 'w'));
        } catch(err) { console.error(err) }

        Promise.resolve().then(function resolver() 
        {
            return message.channel.fetchMessages( { limit : 100, before: lastId} ).then(messages => 
                {
                    if(!messages.size) { return Promise.reject('Completed.');};
                    //add save to sql database later
                    //let file = fs.createWriteStream('messageTrain.txt');
                    //file.on('error', err => { console.log(`Error opening training file.`)});
                    let data = messages.array();
                    data.sort( (a,b) => { return a.createdAt < b.createdAt ? -1 : 1; });
                    data.forEach(mess => { 
                        //file.write(`${mess.content}\n`); 
                        fs.appendFile('messageTrain.txt', `${mess.content}\n`, (err) => {  
                            if (err) throw err;
                        })
                    });
                    //file.end();
                    if(data.length) lastId = data[0].id;
                    else { return Promise.reject('Completed.');};
                    console.log(`Logged ${messages.size} messages`);
                    return 0;
                }
            ).then(resolver); 
        }).catch((error) => { console.log(error); } );
        
	},
}
