const fs = require('fs');
const config = require("../config.json");
const prefix = config.prefix;
module.exports = {
    name: `prefix`,
    description: `The bit that sets the prefix`,
    usage: `${prefix}prefix <new prefix>`,
    execute(message) {

        const nPrefix = message.content.toLocaleLowerCase().split(/ +/)[1];

        const id = message.guild.id;
        config.servers.forEach(server => {
            if (server.id == id) {
                if (nPrefix != server.prefix) server.prefix = nPrefix;
            }
        });

        fs.writeFile('config.json', JSON.stringify(config), function (err) {
            if (err) throw err;
            message.channel.send('Set Prefix');
          });
    },
}