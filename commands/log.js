module.exports = {
	name: `log`,
	description: `The bit that adds extra stuff tot he log`,
	usage: `log`,
	execute(message) {

		if (message.member.hasPermission(`ADMINISTRATOR`) || message.author.id == 829091397486772235) {
            console.log(message)
		} else {
			message.react(`❌`);
			console.log("Permission denied: log")
            message.reply(`Only an Admin can use this command.`)
                    .then(msg => {
                         tOut = 5000;
                         message.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
		}
	},
};
