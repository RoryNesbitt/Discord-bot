module.exports = {
     name: `transfer`,
     description: `The bit that transfers a role to someone new`,
     usage: `give @<person> @<role>`,
     execute(message) {

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

          const member = message.mentions.members.first();
          const role = message.content.toLocaleLowerCase().split(/ +/)[1].slice(3, -1);
          
          if (!message.member.roles.cache.has(role)) {
			message.react(`❌`);
            message.reply(`You do not have this role to give`)
                    .then(msg => {
                         tOut = 5000;
                         message.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
		}

          member.roles.add(role).catch((e) => {
               message.reply(`Failed to add role`)
          });

          if (member.roles.cache.has(role)) {
               message.react(`✔️`);
               message.member.roles.remove(role);
          }
     },
};