const config = require(`../config/config.json`);
const prefix = config.prefix;
module.exports = {
	name: `log`,
	description: `The bit that adds extra stuff tot he log`,
	usage: `${prefix}log`,
	execute(message) {

		if (message.member.hasPermission(`ADMINISTRATOR`) || message.member.roles.cache.has(`691665461586427944`)) {
            console.log(message)
		} else {
			message.react(`❌`);
		}
	},
};
