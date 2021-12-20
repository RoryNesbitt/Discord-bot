module.exports = {
     name: `role`,
     description: `The bit that gives people a role`,
     usage: `role add/remove @<person> @<role>`,
     execute(message) {

          const args = message.content.toLocaleLowerCase().split(/ +/);
          const config = require(`../config/config.json`)
          let roleChannel;
          let prefix;
          const id = message.guild.id;
          config.servers.forEach(server => {
               if (server.id == id) {
                    roleChannel = server.roleChannel;
                    prefix = server.prefix;
               }
          });

          if (!message.member.hasPermission(`MANAGE_ROLES`) || message.author.id == 829091397486772235) {
               message.react(`❌`);
               console.log("Permission denied: role")
               message.reply(`Only a mod can use this command.`)
                    .then(msg => {
                         tOut = 5000;
                         message.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
               return;
          }


          message.delete();

          let member;
          let role;
          if (message.mentions.members.first() != null) {
               member = message.mentions.members.first();
               role = args[3];
          } else {
               member = message.member;
               role = args[2];
          }
          role = role.slice(3, -1);

          switch (args[1]) {
               case `add`:
                    member.roles.add(role).catch((e) => {
                         message.reply(`Failed to add role`)
                         console.log(e)
                         return;
                    });
                    message.reply(`Added the role`);
                    break;
               case `remove`:
                    member.roles.remove(role).catch((e) => {
                         message.reply(`Failed to remove role`)
                         console.log(e)
                         return;
                    });
                    message.reply(`Removed the role`);
                    break;
          }
     },
};
