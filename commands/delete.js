module.exports = {
	name: `delete`,
	description: `The bit that removes stuff`,
	usage: `delete <number> Default:1`,
	execute(message) {
		const args = message.content.toLocaleLowerCase().split(/ +/);

		if (message.member.hasPermission(`MANAGE_MESSAGES`)) {
			num = Number(args[1]);
			if (!num) num = 1;
			if (num > 99) num = 99;
			message.channel.bulkDelete(num + 1);
		} else {
			message.react(`❌`);
			console.log("Permission denied: delete")
            message.reply(`Only a mod can use this command.`)
                    .then(msg => {
                         tOut = 3000;
                         message.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
		}

	},
};