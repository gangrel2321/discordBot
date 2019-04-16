const fs = require('fs')
//add filtering for bot messages and ! messages and ?url messages?
module.exports = {
	name: 'allocate',
    description: `Loads current text for learning.`,
    cooldown: 10,
	execute(message, args) {
        var lastId = message.channel.lastMessageID
        const fs = require('fs')
        const path = './textGeneration/messageTrain.txt'
        try {
            if (fs.existsSync(path))
                fs.writeFile('./textGeneration/messageTrain.txt', '', (err) => { if(err) throw err; });
            else fs.closeSync(fs.openSync('./textGeneration/messageTrain.txt', 'w'));
        } catch(err) { console.error(err) }

        Promise.resolve().then(function resolver() 
        {
            return message.channel.fetchMessages( { limit : 100, before: lastId} ).then(messages => 
                {
                    if(!messages.size) { return Promise.reject('Completed.');};
                    //add save to sql database later
                    //let file = fs.createWriteStream('messageTrain.txt');
                    //file.on('error', err => { console.log(`Error opening training file.`)});
                    let data = messages.filter(mess => 
                        {
                            let flag = 0;
                            if(mess.content && mess.content[0] != '!' && !mess.content.includes("http") && 
                                !mess.author.bot && !(mess.content.indexOf('<@' > -1) &&
                                (mess.content.replace(/\D/g,'').length / mess.content.length) > 0.80) )
                                return 1;
                            return 0;
                        } 
                    ).array();
                    data.sort( (a,b) => { return a.createdAt < b.createdAt ? -1 : 1; });
                    data.forEach(mess => { 
                        //file.write(`${mess.content}\n`); 
                        fs.appendFile('./textGeneration/messageTrain.txt', `${mess.content}\n`, (err) => {  
                            if (err) throw err;
                        })
                    });
                    //file.end();
                    if(data.length) lastId = data[0].id;
                    else { return Promise.reject('Completed.');};
                    //console.log(`Logged ${data.length} messages`);
                    return 0;
                }
            ).then(resolver); 
        }).catch((error) => { console.log(error); } );
        
	},
}
