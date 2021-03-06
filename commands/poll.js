module.exports = {
	name: `poll`,
	description: `The bit that makes polls`,
	usage: `poll <question to ask>`,
	execute(message) {

		const config = require(`../config/config.json`);
        const id = message.guild.id;
        let prefix;
        config.servers.forEach(server => {
            if (server.id == id) prefix = server.prefix;
        });

		msg = message.content.slice(prefix.length + 5);
		let args = msg.split(/ +/);
		if (!args[0]) return;

		message.delete();
		args = args.join(` `);
		message.channel.send(`📝 **${args}**`).then(messageReaction => {
			messageReaction.react(`✅`);
			messageReaction.react(`❎`);
		});

	},
};
