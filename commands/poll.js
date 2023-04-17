const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('The bit that makes polls'),
	// usage: `poll <question to ask>`,
	async execute(interaction) {

		const config = require(`../config/config.json`);
        const id = interaction.guild.id;
        let prefix;
        config.servers.forEach(server => {
            if (server.id == id) prefix = server.prefix;
        });

		msg = interaction.content.slice(prefix.length + 5);
		let args = msg.split(/ +/);
		if (!args[0]) return;

		interaction.delete();
		args = args.join(` `);
		interaction.channel.send(`📝 **${args}**`).then(interactionReaction => {
			interactionReaction.react(`✅`);
			interactionReaction.react(`❎`);
		});

	},
};
