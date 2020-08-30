const Discord = require(`discord.js`);
const config = require(`./config.json`);
const token = require(`./token.json`);
const fs = require(`fs`);

const client = new Discord.Client();
client.login(token.token);
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));

for (const file of commandFiles) {
     const command = require(`./commands/${file}`);

     // set a new item in the Collection
     // with the key as the command name and the value as the exported module
     client.commands.set(command.name, command);
}

client.on(`ready`, () => {
     console.log(`This bot is online!`);
     client.user.setActivity(`!Help !1d20`, { type: `WATCHING` })
          .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
          .catch(console.error);

})

/*client.on(`guildMemberAdd`, member => {
     defaultChannel = message.guild.channels.find(channel => channel.name === `the-summoned`);
     defaultChannel.send(`Welcome to the server, ${member}!`);
     defaultChannel.send(`Please join a game from the #role-allocation channel);
});*/

client.on(`message`, message => {

     if (message.author.bot) return;

     delete require.cache[require.resolve("./config.json")];
     const config = require("./config.json");
     let prefix;
     let roleChannel;

     const id = message.guild.id;
     config.servers.forEach(server => {
          if (server.id == id) {
               prefix = server.prefix;
               roleChannel = server.roleChannel;
          }

     });

     var msg = message.content.toLocaleLowerCase()

     if (message.channel == roleChannel) {
          if (!msg.startsWith(`${prefix}add`) && !(msg.startsWith(`${prefix}delete`) && message.member.hasPermission(`MANAGE_MESSAGES`))) {
               message.react(`❌`)
               message.channel.send(`this channel is just for using the ${prefix}add command`)
                    .then(msg => {
                         tOut = 2000;
                         msg.delete({ timeout: tOut })
                         message.delete({ timeout: tOut })
                    })
                    .catch(console.error);
               return;
          }
     }

     switch (msg) {        //hard coded commands not using the prefix //theres only one but it`s switch for ease of expanding
          case `hello there`:
               console.log(msg);
               message.channel.send(`General Kenobi`);
               return;
     }

     if (msg.includes("<@!312299256776097792>")) {
          message.channel.send("https://tenor.com/view/no-wack-not-funny-hannibul-gif-5760013")
     }

     if (msg.startsWith(prefix)) {           //if it has the prefix, drop it
          msg = msg.slice(prefix.length);
     } else if (!msg.startsWith(`roll`)) {    //if no prefix and not `roll`, return  //roll is allowed without a prefix
          return;
     }

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
