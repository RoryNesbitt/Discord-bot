module.exports = {
	name: `log`,
	description: `The bit that adds extra stuff tot he log`,
	usage: `log`,
	execute(message) {

		if (message.member.hasPermission(`ADMINISTRATOR`) || message.member.roles.cache.has(`691665461586427944`)) {
            console.log(message)
		} else {
			message.react(`❌`);
		}
	},
};
