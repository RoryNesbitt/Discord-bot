const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('The bit that removes stuff'),
	// usage: `delete <number> Default:1`,
	async execute(interaction) {
		const args = interaction.content.toLocaleLowerCase().split(/ +/);

		if (interaction.member.hasPermission(`MANAGE_MESSAGES`) || interaction.author.id == 829091397486772235) {
			num = Number(args[1]);
			if (!num) num = 1;
			if (num > 99) num = 99;
			interaction.channel.bulkDelete(num + 1);
		} else {
			interaction.react(`❌`);
			console.log("Permission denied: delete")
            interaction.reply(`Only a mod can use this command.`)
                    .then(msg => {
                         tOut = 5000;
                         interaction.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
		}

	},
};
