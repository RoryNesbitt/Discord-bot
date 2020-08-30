module.exports = {
	name: `foo`,
	description: `The bit that says bar`,
	usage: `foo`,
	execute(message) {
		message.channel.send(`bar`);
	},
};