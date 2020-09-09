module.exports = {
     name: `add`,
     description: `The bit that adds players to a game`,
     usage: `add <game name>`,
     execute(message) {

          const config = require(`../config/config.json`)
          let roleChannel;
          const id = message.guild.id;
          config.servers.forEach(server => {
               if (server.id == id) {
                    roleChannel = server.roleChannel;
               }
          });
          if (message.channel != roleChannel && roleChannel != null) {
               message.react(`❌`);
               message.reply(`Please use <#${roleChannel}> to keep this channel tidy`)
                    .then(msg => {
                         tOut = 5000;
                         message.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
               return;
          }

          
		const role = message.content.toLocaleLowerCase().split(/ +/)[1];
          switch (role) {
               case `over`:
               case `overs`:
               case `over18`:
                    if (!message.member.roles.cache.has(`691655875697442850`)) {
                         message.member.roles.add(`689571794847400022`);
                         message.reply(`Added to overs`);
                    } else {
                         message.react(`❌`);
                         message.reply(`You are already part of unders, contact a mod if this needs changed`);
                    }
                    return;
               case `under`:
               case `unders`:
               case `under18`:
                    if (!message.member.roles.cache.has(`689571794847400022`)) {
                         message.member.roles.add(`691655875697442850`);
                         message.reply(`Added to unders`);
                    } else {
                         message.react(`❌`);
                         message.reply(`You are already part of overs, contact a mod if this needs changed`);
                    }
                    return;
               case `afternoon`:
                    guildMember = message.member;
                    guildMember.roles.add(`692091274248847491`);
                    message.reply(`Added to Afternoon DND`);
                    break;
               case `narpsone`:
               case `one`:
               case `narps1`:
               case `1`:
                    guildMember = message.member;
                    guildMember.roles.remove(`691684524492324895`);
                    guildMember.roles.add(`691684349761945662`);
                    message.reply(`Added to Narps One`);
                    break;
               case `narpstwo`:
               case `two`:
               case `narps2`:
               case `2`:
                    guildMember = message.member;
                    guildMember.roles.remove(`691684349761945662`);
                    guildMember.roles.add(`691684524492324895`);
                    message.reply(`Added to Narps Two`);
                    break;
               case `shenanigan`:
               case `shenanigans`:
                    guildMember = message.member;
                    guildMember.roles.add(`691685497768247336`);
                    message.reply(`Added to Shenanigan Squad`);
                    break;
               case 'free':
               case 'freerpg':
                    guildMember = message.member;
                    guildMember.roles.add(`736192755683819601`);
                    message.reply(`Enjoy your time at Free RPG Weekend`);
                    break;
               default:
                    message.channel.send(`Add yourself to a game by sending ${prefix}add <game name>`);
                    break;
          }
     },
};
