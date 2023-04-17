const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(`The bit that doesn't help`),
	// usage: `help`,
	async execute(interaction) {
		interaction.channel.send(`I need help too`);
	},
};
