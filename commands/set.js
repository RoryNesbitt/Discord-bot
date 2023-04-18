const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('The bit that sets things in the config'),
  // usage: `set <variable> <new value>`,
  async execute(interaction) {
    if (!interaction.member.hasPermission(`ADMINISTRATOR`) && !interaction.author.id == 829091397486772235n) {
      interaction.react(`❌`);
      console.log("Permission denied: set")
      interaction.reply(`Only an admin can use this command.`)
        .then(msg => {
          const tOut = 5000;
          interaction.delete({ timeout: tOut })
          msg.delete({ timeout: tOut })
        })
        .catch(console.error);
      return;
    }
    const fs = require(`fs`);

    let updated = false;
    const config = require(`../config/config.json`)
    const args = interaction.content.toLocaleLowerCase().split(/ +/)
    const cfg = args[1];
    const id = interaction.guild.id;
    let server;
    config.servers.forEach(item => {
      if (item.id == id) {
        server = item;
      }
    });

    switch (cfg) {
      case `prefix`:
        if (args[2] == null || args[2] == `-`) {
          interaction.react(`❌`);
          interaction.channel.send(`Invalid prefix`)
        } else {
          server.prefix = args[2];
          updated = true;
        }
        break;
      case `roleChannel`:
      case `role-channel`:
        server.roleChannel = interaction.channel.id;
        updated = true;
        break;
      default:
        interaction.react(`❌`);
        interaction.channel.send(`Use this to change the prefix or add a new role-channel`);
        break;

    }

    if (updated) {
      fs.writeFile(`config/config.json`, JSON.stringify(config), function(err) {
        if (err) console.log(err);
        interaction.channel.send(`Updated ${cfg}`);
      });
    }
  },
};
