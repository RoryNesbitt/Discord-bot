const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('everyone')
    .setDescription('The bit that replies to @everyone'),
  // usage: `Don't`,
  async execute(interaction) {

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

    let num;
    let reply;
    num = 3;  //There must be a way to automate this
    //An array won't work because some are replies and some are channel.send
    reply = Math.ceil(Math.random() * num);
    switch (reply) {
      case 1:
        interaction.reply(`gonnie naw!`);
        break;
      case 2:
        interaction.channel.send(`https://tenor.com/view/idiot-gordon-ramsay-fucking-donkey-gif-4653512`);
        break;
      case 3:
        interaction.reply("here you, you wank!");
        break;
    }
  },
};
