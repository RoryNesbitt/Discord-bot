const config = require(`../servers.json`);
const prefix = config.prefix;
module.exports = {
	name: `announce`,
	description: `The bit that announces`,
	usage: `${prefix}announce <What you want me to say>`,
	execute(message) {

		if (message.member.hasPermission(`ADMINISTRATOR`) || message.member.roles.cache.has(`691665461586427944`)) {
			message.delete();
			message.channel.send(message.content.slice(prefix.length + 8));
		} else {
			message.react(`❌`);
		}
	},
};
