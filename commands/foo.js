const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('foo')
    .setDescription('The bit that says bar'),
  async execute(interaction) {
    interaction.channel.send(`bar`);
  },
};
