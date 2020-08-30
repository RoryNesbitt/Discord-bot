const config = require(`../config/config.json`);
const prefix = config.prefix;
module.exports = {
	name: `help`,
	description: `The bit that doesn't help`,
	usage: `${prefix}help`,
	execute(message) {
		message.channel.send(`I need help too`);
	},
};