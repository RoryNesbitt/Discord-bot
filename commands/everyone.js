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

          switch (id) {
               case `709166827254841538`: //DFZ
                    message.channel.send("Gonnie naw!")
                    break;
               case `718251835969896448`: //OK
                    message.channel.send("Gonnie naw!")
                    break;
          }
     },
};
