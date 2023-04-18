const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('log')
    .setDescription('The bit that adds extra stuff tot he log'),
  // usage: `log`,
  async execute(interaction) {

    if (interaction.member.hasPermission(`ADMINISTRATOR`) || interaction.author.id == 829091397486772235n) {
      console.log(interaction)
    } else {
      interaction.react(`❌`);
      console.log("Permission denied: log")
      interaction.reply(`Only an Admin can use this command.`)
        .then(msg => {
          const tOut = 5000;
          interaction.delete({ timeout: tOut })
          msg.delete({ timeout: tOut })
        })
        .catch(console.error);
    }
  },
};
