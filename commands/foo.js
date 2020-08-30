const config = require(`../config/config.json`);
const prefix = config.prefix;
module.exports = {
	name: `foo`,
	description: `The bit that says bar`,
	usage: `${prefix}foo`,
	execute(message) {
		message.channel.send(`bar`);
	},
};