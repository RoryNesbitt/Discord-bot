const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('The bit that corrects you'),
    // usage: `Try not to use this`,
	async execute(interaction) {
        command = interaction.content.slice(prefix.length)
        user = `<@234395307759108106>`
        interaction.react(`❌`);
        interaction.channel.send(`If you are trying to use ${user} the command is \`-${command}\``);
	},
};
