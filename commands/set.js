module.exports = {
    name: `set`,
    description: `The bit that sets things in the config`,
    usage: `set <variable> <new value>`,
    execute(message) {
        if (!message.member.hasPermission(`ADMINISTRATOR`)) {
            message.react(`❌`);
            console.log("Permission denied: set")
            message.reply(`Only an admin can use this command.`)
                    .then(msg => {
                         tOut = 5000;
                         message.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
            return;
		}
        const fs = require(`fs`);

        let updated = false;
        const config = require(`../config/config.json`)
        const args = message.content.toLocaleLowerCase().split(/ +/)
        const cfg = args[1];
        const id = message.guild.id;
        let server;
        config.servers.forEach(item => {
            if (item.id == id) {
                server = item;
            }
        });

        switch (cfg) {
            case `prefix`:
                if (args[2] == null || args[2] == `-`) {
                    message.react(`❌`);
                    message.channel.send(`Invalid prefix`)
                } else {
                    server.prefix = args[2];
                    updated = true;
                }
                break;
            case `roleChannel`:
            case `role-channel`:
                server.roleChannel = message.channel.id;
                updated = true;
                break;
            default:
                message.react(`❌`);
                message.channel.send(`Use this to change the prefix or add a new role-channel`);
                break;

        }

        if (updated) {
            fs.writeFile(`config/config.json`, JSON.stringify(config), function (err) {
                if (err) console.log(err);
                message.channel.send(`Updated ${cfg}`);
            });
        }
    },
}