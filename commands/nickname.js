module.exports = {
     name: `nickname`,
     description: `The bit that gives people a nickname`,
     usage: `nickname @<person> nickname`,
     execute(message) {

          const args = message.content.split(/ +/);
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

          if (!message.member.hasPermission(`MANAGE_NICKNAMES`) && !message.author.id == 829091397486772235) {
               message.react(`❌`);
               console.log("Permission denied: nickname")
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
          let name;
          if (message.mentions.members.first() != null) {
               member = message.mentions.members.first();
               name = args[2];
          } else {
               member = message.member;
               name = args[1];
          }

          member.setNickname(name).catch((e) => {
               message.reply(`Failed to add nickname`)
               console.log(e)
               return;
          });
     },
};
