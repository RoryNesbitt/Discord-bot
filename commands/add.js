const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('The bit that adds players to a role'),
     //usage: `add <role>`,
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
          if (interaction.channel != roleChannel && roleChannel != null) {
               interaction.react(`❌`);
               interaction.reply(`Please use <#${roleChannel}> to keep this channel tidy`)
                    .then(msg => {
                         tOut = 5000;
                         interaction.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
               return;
          }

          const role = interaction.content.toLocaleLowerCase().split(/ +/)[1];

          switch (id) {
               case `689569549829668870`: //NARPS server
                    switch (role) {
                         case `over`:
                         case `overs`:
                         case `over18`:
                              if (!interaction.member.roles.cache.has(`691655875697442850`)) {
                                   interaction.member.roles.add(`689571794847400022`);
                                   interaction.reply(`Added to overs`);
                              } else {
                                   interaction.react(`❌`);
                                   interaction.reply(`You are already part of unders, contact a mod if this needs changed`);
                              }
                              return;
                         case `under`:
                         case `unders`:
                         case `under18`:
                              if (!interaction.member.roles.cache.has(`689571794847400022`)) {
                                   interaction.member.roles.add(`691655875697442850`);
                                   interaction.reply(`Added to unders`);
                              } else {
                                   interaction.react(`❌`);
                                   interaction.reply(`You are already part of overs, contact a mod if this needs changed`);
                              }
                              return;
                         case `afternoon`:
                              guildMember = interaction.member;
                              guildMember.roles.add(`692091274248847491`);
                              interaction.reply(`Added to Afternoon DND`);
                              break;
                         case `narpsone`:
                         case `one`:
                         case `narps1`:
                         case `1`:
                              guildMember = interaction.member;
                              guildMember.roles.remove(`691684524492324895`);
                              guildMember.roles.add(`691684349761945662`);
                              interaction.reply(`Added to Narps One`);
                              break;
                         case `narpstwo`:
                         case `two`:
                         case `narps2`:
                         case `2`:
                              guildMember = interaction.member;
                              guildMember.roles.remove(`691684349761945662`);
                              guildMember.roles.add(`691684524492324895`);
                              interaction.reply(`Added to Narps Two`);
                              break;
                         case `shenanigan`:
                         case `shenanigans`:
                              guildMember = interaction.member;
                              guildMember.roles.add(`691685497768247336`);
                              interaction.reply(`Added to Shenanigan Squad`);
                              break;
                         case 'free':
                         case 'freerpg':
                              guildMember = interaction.member;
                              guildMember.roles.add(`736192755683819601`);
                              interaction.reply(`Enjoy your time at Free RPG Weekend`);
                              break;
                         default:
                              interaction.channel.send(`Add a role by sending ${prefix}add <role code>`);
                              break;
                    }
                    break;
               default:
                    interaction.channel.send(`This server hasn't been set up for managing roles yet`)
          }
	},
};
