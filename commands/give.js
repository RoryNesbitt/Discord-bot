module.exports = {
     name: `give`,
     description: `The bit that gives people a role`,
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

          if (!message.member.hasPermission(`MANAGE_ROLES`)) {
			message.react(`❌`);
			console.log("Permission denied: give")
            message.reply(`Only a mod can use this command.`)
                    .then(msg => {
                         tOut = 5000;
                         message.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
		}

          const member = message.mentions.members.first();
          const role = message.content.toLocaleLowerCase().split(/ +/)[2].slice(3, -1);
          message.delete();
          member.roles.add(role).catch((e) => {
               message.reply(`Failed to add role`)
          });

          if (member.roles.cache.has(role)) {
               message.reply(`Added the role`);
          }
     },
};
