const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('The bit that gives people a role'),
     // usage: `role add/remove @<person> @<role>`,
	async execute(interaction) {

          const args = interaction.content.toLocaleLowerCase().split(/ +/);
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

          if (!interaction.member.hasPermission(`MANAGE_ROLES`) && !interaction.author.id == 829091397486772235) {
               interaction.react(`❌`);
               console.log("Permission denied: role")
               interaction.reply(`Only a mod can use this command.`)
                    .then(msg => {
                         tOut = 5000;
                         interaction.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
               return;
          }


          interaction.delete();

          let member;
          let role;
          if (interaction.mentions.members.first() != null) {
               member = interaction.mentions.members.first();
               role = args[3];
          } else {
               member = interaction.member;
               role = args[2];
          }
          role = role.slice(3, -1);

          switch (args[1]) {
               case `add`:
                    member.roles.add(role).catch((e) => {
                         interaction.reply(`Failed to add role`)
                         console.log(e)
                         return;
                    });
                    interaction.reply(`Added the role`);
                    break;
               case `remove`:
                    member.roles.remove(role).catch((e) => {
                         interaction.reply(`Failed to remove role`)
                         console.log(e)
                         return;
                    });
                    interaction.reply(`Removed the role`);
                    break;
          }
	},
};
