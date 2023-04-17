const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('transfer')
		.setDescription('The bit that transfers a role to someone new'),
     // usage: `give @<role> @<person>`,
	async execute(interaction) {

          const config = require(`../config/config.json`)
          let prefix;
          const id = interaction.guild.id;
          config.servers.forEach(server => {
               if (server.id == id) {
                    prefix = server.prefix;
               }
          });

          const member = interaction.mentions.members.first();
          const role = interaction.content.split(/ +/)[1].slice(3, -1);

          if (!interaction.member.roles.cache.has(role)) {
               interaction.react(`❌`);
               interaction.reply(`You do not have this role to give`)
                    .then(msg => {
                         tOut = 5000;
                         interaction.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
               return;
          }

          member.roles.add(role).catch((e) => {
               interaction.reply(`Failed to add role`)
               return;
          });

          interaction.react(`✔️`);
          interaction.member.roles.remove(role);

	},
};
