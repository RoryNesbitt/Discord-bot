module.exports = {
	name: `help`,
	description: `The bit that doesn't help`,
	usage: `help`,
	execute(message) {
		message.channel.send(`I need help too`);
	},
};