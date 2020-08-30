const config = require(`../config/config.json`);
const prefix = config.prefix;
module.exports = {
	name: `poll`,
	description: `The bit that makes polls`,
	usage: `${prefix}poll`,
	execute(message) {

		const args = message.content.toLocaleLowerCase().split(/ +/);
		if (!args[0]) return;

		message.delete();
		args = args.join(` `);
		message.channel.send(`📝 **${args}**`).then(messageReaction => {
			messageReaction.react(`✅`);
			messageReaction.react(`❎`);
		});

	},
};