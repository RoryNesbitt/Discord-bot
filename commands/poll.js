module.exports = {
	name: `poll`,
	description: `The bit that makes polls`,
	usage: `poll <question to ask>`,
	execute(message) {

		let args = message.content.toLocaleLowerCase().split(/ +/);
		if (!args[0]) return;

		message.delete();
		args = args.join(` `);
		message.channel.send(`📝 **${args}**`).then(messageReaction => {
			messageReaction.react(`✅`);
			messageReaction.react(`❎`);
		});

	},
};
