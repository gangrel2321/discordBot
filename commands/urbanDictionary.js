const ud = require('urban-dictionary')
module.exports = {
	name: 'define',
	description: 'Retrieve info on a particular term.',
	execute(message, args) {
		ud.term(args.join(' ')).then((result) => {
            const entries = result.entries
            message.channel.send(`Official definition:\n${entries[0].definition}`)
          }).catch((error) => {
            console.error(error.message)
            message.channel.send(`How about a less stupid word?\n`)
            ud.random().then((result) => {
                message.channel.send(`Official definition of ${result.word}:\n${result.definition}`)
              }).catch((error) => {
                console.error(error.message)
              })
          })
	},
}