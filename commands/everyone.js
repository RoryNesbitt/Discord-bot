module.exports = {
     name: `everyone`,
     description: `The bit that replies to @everyone`,
     usage: `Don't`,
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

          let num;
          let reply;
          switch (id) {
               case `709166827254841538`: //DFZ
                    num = 3;
                    reply = Math.ceil(Math.random() * num);
                    switch (reply) {
                         case 1:
                              message.reply(`gonnie naw!`);
                              break;
                         case 2:
                              message.channel.send(`https://tenor.com/view/idiot-gordon-ramsay-fucking-donkey-gif-4653512`);
                              break;
                         case 3:
                              message.reply("here you, you wank!");
                              break;
                    }
                    break;
               case `718251835969896448`: //OK
                    num = 3;
                    reply = Math.ceil(Math.random() * num);
                    switch (reply) {
                         case 1:
                              message.reply(`gonnie naw!`);
                              break;
                         case 2:
                              message.channel.send(`https://tenor.com/view/idiot-gordon-ramsay-fucking-donkey-gif-4653512`);
                              break;
                         case 3:
                              message.reply("here you, you wank!");
                              break;
                    }
                    break;
          }
     },
};
