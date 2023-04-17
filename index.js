const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');


fs.access('./config/config.json', fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.log(`No Config`)
    const dConfig = require(`./default.json`);
    fs.writeFile(`config/config.json`, JSON.stringify(dConfig), function(err) {
      if (err) console.log(err);
      console.log(`Copied default config`)
    });
  }
});

const client = new Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'MessageContent',
  ]
});

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.username}`);
  client.user.setActivity(`!Help !1d20`, { type: `WATCHING` })
});


client.login(process.env.TOKEN_VAL);


client.on('channelCreate', channel => {
  channel.send("New channel who dis?");
})

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
	}
}

client.on(`InteractionCreate`, interaction => {
	console.log(interaction);
});

/////////////////////////////////////////////////////////////////////////


client.on("guildCreate", guild => {
  let config = require("./config/config.json");
  const id = guild.id;
  let done = false;
  config.servers.forEach(server => {
    if (server.id == id) {
      done = true;
    }
  });
  if (done) return;
  console.log(`Adding server ${id}`)
  let servers = config.servers;
  let newServer = new Object;
  newServer.id = id;
  newServer.prefix = config.defaultPrefix;
  servers.push(newServer);
  config.servers = servers;
  fs.writeFile(`config/config.json`, JSON.stringify(config), function(err) {
    if (err) console.log(err);
  });
});

client.on(Events.MessageCreate, message => {
  if (message.author.bot) return;

  delete require.cache[require.resolve("./config/config.json")];
  const config = require("./config/config.json");
  let prefix;
  let roleChannel;

  const id = message.guild.id;
  config.servers.forEach(server => {
    if (server.id == id) {
      prefix = server.prefix;
      roleChannel = server.roleChannel;
    }
  });
  if (prefix == undefined){
    prefix = `!`
  }

  var msg = message.content.toLocaleLowerCase()

  if (message.channel == roleChannel) {
    if (!msg.startsWith(`${prefix}add`) && !(msg.startsWith(`${prefix}delete`) && message.member.hasPermission(`MANAGE_MESSAGES`))) {
      message.react(`❌`)
      message.channel.send(`this channel is just for using the ${prefix}add command`)
        .then(msg => {
          const tOut = 2000;
          msg.delete({ timeout: tOut })
          message.delete({ timeout: tOut })
        })
        .catch(console.error);
      return;
    }
  }

  if (msg.startsWith("hello there")) {
    console.log(msg);
    message.channel.send(`General Kenobi`);
    return;
  }

  if (message.mentions.everyone) {
    client.commands.get(`everyone`).execute(message);
  }

  console.log(msg)
  if (msg.startsWith(prefix)) {           //if it has the prefix, drop it
    msg = msg.slice(prefix.length);
  } else if (!msg.startsWith(`roll`)) {    //if no prefix and not `roll`, return  //roll is allowed without a prefix
    return;
  }
  console.log(msg)

  const args = msg.split(/ +/);
  const command = args.shift();
  console.log(msg);

  if (!client.commands.has(command)) {                   //if it`s not in the generated array then it might be a dice roll like !1d20 or !69d420
    client.commands.get(`roll`).execute(message);     //so let the roll command deal with it
    return;
  };

  try {
    client.commands.get(command).execute(message, args); //if it got this far it`s not hard coded but is in the array of known commands, so execute it
  } catch (error) { //catch has never once actually stopped a crash for this bot, yet I do it
    console.log(error);
  }
})
