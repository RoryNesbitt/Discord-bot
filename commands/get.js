const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get')
		.setDescription('The bit that does help'),
     // usage: `get <topic/command>`,
	async execute(interaction) {

          const package = require(`../package.json`);
          const version = package.version;
          const config = require(`../config/config.json`);
          let prefix;
          const id = interaction.guild.id;
          config.servers.forEach(server => {
               if (server.id == id) {
                    prefix = server.prefix;
               }
          });
          const fs = require(`fs`);
          const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));
          var files = new Array;
          var errorMsg = `Get info with ${prefix}get <topic/command>`;

          const args = interaction.content.toLocaleLowerCase().split(/ +/);
          switch (args[1]) {
               case `commands`:
                    switch (args[2]) {
                         case `mod`:
                         case `mods`:
                              interaction.channel.send(`These are the Mod commands I respond to: \n ${prefix}delete <number> default: 1 \n ${prefix}announce <what you want me to say>`);
                              break;
                         default:
                              interaction.channel.send(`These are the commands I respond to: \n "roll d10 ± 3" / "${prefix}2d20±5 & 4d6" or any variation you wish \n ${prefix}add <role code> \n ${prefix}poll <Question for the poll> \n ${prefix}help \n ${prefix}get <topic> for details`);
                              break;
                    }
                    break;
               case `version`:
                    interaction.channel.send(`version ${version}`);
                    break;
               case `info`:
                    interaction.channel.send(`I am The Overseer. I roll your dice and rule your life!`);
                    break;
               case `all`:
                    if (interaction.member.hasPermission(`ADMINISTRATOR`) || interaction.author.id == 829091397486772235) {
                         buildList()
                         var msg = `These are all the commands I know`
                         commandFiles.forEach(element => {
                              msg = msg + `\n ${files[element].name}`
                         });
                         interaction.channel.send(msg)
                         break;
                    }
               default:
                    if (args[0]) {
                         buildList();
                         try {
                              turnToEmbed(files[`${args[1]}.js`])
                         } catch (error) {
                              console.log(`${interaction.content} didn't get`)
                              interaction.channel.send(errorMsg)
                         }
                    } else {
                         interaction.channel.send(errorMsg)
                    }
                    break;
          }

          function buildList() {
               for (var i = 0; i < commandFiles.length; i++) {
                    var file = require(`./${commandFiles[i]}`);
                    files[commandFiles[i]] = file;
               }
          }

          function turnToEmbed(object) {

               interaction.channel.send({
                    embed: {
                         color: 16580705,
                         title: `Command: ${object.name}`,
                         description: `Description: ${object.description}`,
                         footer: {
                              text: `Usage: ${object.usage}`
                         }
                    }
               });
          }
	},
};
