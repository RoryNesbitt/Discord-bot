const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('The bit that corrects you'),
  // usage: `Try not to use this`,
  async execute(interaction) {
    const config = require(`../config/config.json`);
    const id = interaction.guild.id;
    let prefix;
    config.servers.forEach(server => {
      if (server.id == id) prefix = server.prefix;
    });

    const command = interaction.content.slice(prefix.length)
    const user = `<@234395307759108106>`
    interaction.react(`❌`);
    interaction.channel.send(`If you are trying to use ${user} the command is \`-${command}\``);
  },
};
