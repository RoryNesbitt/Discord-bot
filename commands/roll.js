const Discord = require(`discord.js`);
const config = require(`../config/config.json`);
const prefix = config.prefix;
module.exports = {
    name: `roll`,
    description: `The bit that rolls the dice`,
    usage: `(${prefix})roll <quantity> d <value> ± <modifier> & <repeat>  -- Most values are optional`,
    execute(message) {
<<<<<<< HEAD
        const config = require(`../config/config.json`);
        const prefix = config.prefix;
=======
        const config = require(`../config.json`);
        const id = message.guild.id;
        let prefix;
        config.servers.forEach(server => {
            if (server.id == id) prefix = server.prefix;
        });
>>>>>>> edb074cc6bdc0e68f3ab5e70555e3c50e8da6fba
        const re = /((\d*)d(\d*)(\-|\+?)(\d*))x?(\d*)c?(\d*)?/
        var command = message.content.toLocaleLowerCase();
        command = command.replace(/\s/g, ``);
        var failed = false;
        var iteration = 0;
        var fTotal = 0;
        var count;
        var cTotal = 0;
        var footer;
        var diceEmbed;
        setEmbed()

        try {
            if (command.startsWith(prefix)) {
                command = command.slice(prefix.length);
            }
            if (command.startsWith(`roll`)) {
                command = command.slice(4);
            }

            var dice = command.split(/&/g);



            dice.forEach(dice => {

                if (failed) return;
                if (dice.startsWith(`d`)) {
                    dice = `1` + dice;
                }

                var values = dice.match(re);

                console.log(`Attempting to dice: ${dice}\n${values}`);
                var request = values[1];
                var quantity = parseInt(values[2]);
                var die = parseInt(values[3]);
                var math = values[4];
                var modifier = parseInt(values[5]);
                var times = parseInt(values[6]);
                count = parseInt(values[7]);

                if (isNaN(modifier)) modifier = null;
                if (isNaN(count)) count = null;
                if (!times) times = 1;

                for (let i = 0; i < times; i++) {
                    var results = ``;
                    var total = 0;

                    for (var j = 0; j < quantity; j++) {
                        const roll = Math.ceil(Math.random() * die);
                        results = `${results}, ${roll}`;
                        total = total + roll;
                        if (count && roll >= count) cTotal++
                    }
                    if (math == `+` && modifier) {
                        total = total + modifier;
                    } else if (math == `-` && modifier) {
                        total = total - modifier;
                    }

                    if (!results.length == 0 && !isNaN(total)) {

                        iteration++
                        fTotal += total;
                        diceEmbed.addField(`Roll ${iteration}: ${request}`, `Result: ${total}`, true)
                        footer = `${footer} [Roll ${iteration}: ${results}]`
                        if (iteration % 25 == 0) {
                            sendDice()
                            setEmbed()
                        }

                    } else {
                        failed = true;
                    }
                }
            });
        } catch (error) {
            console.log(`${message.content} didn't dice`)
            failed = true;
        }
        if (!failed) {
            if (iteration % 25 == 0) {
                diceEmbed.setTitle(`Doing some math`)
                    .setThumbnail(`https://www.insidejapantours.com/blog/wp-content/uploads/2011/03/abacus.png`)
            }
            if (count) {
                diceEmbed.addField(`Number of results ${count} or more`, `${cTotal}`)
            } else if (iteration != 1) {
                diceEmbed.addField(`Total over all dice`, `${fTotal}`)
            }
            sendDice();
        }

        function setEmbed() {
            footer = `On the dice:\n`
            diceEmbed = new Discord.MessageEmbed()
                .setColor(3447003)
                .setTitle(`Rolling your dice`)
                .setURL(`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Faa1a5178aef33568e9c4-a77ea51e8d8892c1eb8348eb6b3663f6.ssl.cf5.rackcdn.com%2Fp%2Ffull%2F1e2b8916-ed08-4198-9699-c4cdcf798a20.jpg&f=1&nofb=1`)
                .setAuthor(`${message.author.username}`, message.author.avatarURL(), `https://discord.js.org`)
                .setThumbnail(`https://cdn.pixabay.com/photo/2017/08/31/04/01/d20-2699387_960_720.png`)

        }
        function sendDice() {
            if (footer.length > 13 && footer.length < 2048) diceEmbed.setFooter(footer, ``);
            message.channel.send(diceEmbed);
        }
    }
};