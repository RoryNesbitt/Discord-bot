const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('The bit that gives people a nickname'),
  // usage: `nickname @<person> nickname`,
  async execute(interaction) {

    const args = interaction.content.split(/ +/);
    const config = require(`../config/config.json`)
    let roleChannel;
    let prefix;
    const id = interaction.guild.id;
    config.servers.forEach(server => {
      if (server.id == id) {
        roleChannel = server.roleChannel;
        prefix = server.prefix;
      }
    });

    if (!interaction.member.hasPermission(`MANAGE_NICKNAMES`) && !interaction.author.id == 829091397486772235n) {
      interaction.react(`❌`);
      console.log("Permission denied: nickname")
      interaction.reply(`Only a mod can use this command.`)
        .then(msg => {
          const tOut = 5000;
          interaction.delete({ timeout: tOut })
          msg.delete({ timeout: tOut })
        })
        .catch(console.error);
      return;
    }


    interaction.delete();

    let member;
    let name;
    if (interaction.mentions.members.first() != null) {
      member = interaction.mentions.members.first();
      name = args[2];
    } else {
      member = interaction.member;
      name = args[1];
    }

    member.setNickname(name).catch((e) => {
      interaction.reply(`Failed to add nickname`)
      console.log(e)
      return;
    });
  },
};
