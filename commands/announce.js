const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('The bit that announces'),
	// usage: `announce <What you want me to say>`,
	async execute(interaction) {
		const config = require(`../config/config.json`);
        const id = interaction.guild.id;
        let prefix;
        config.servers.forEach(server => {
            if (server.id == id) prefix = server.prefix;
        });
		if (interaction.member.hasPermission(`ADMINISTRATOR`) || interaction.author.id == 829091397486772235) {
			interaction.delete();
			interaction.channel.send(interaction.content.slice(prefix.length + 8));
		} else {
			interaction.react(`❌`);
			console.log("Permission denied: announce")
			console.log(interaction.author.id)
            interaction.reply(`Only an mod can use this command.`)
                    .then(msg => {
                         tOut = 5000;
                         interaction.delete({ timeout: tOut })
                         msg.delete({ timeout: tOut })
                    })
                    .catch(console.error);
		}
	},
};
