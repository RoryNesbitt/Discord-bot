const Discord = require(`discord.js`);
const config = require(`../config/config.json`);
const prefix = config.prefix;
module.exports = {
    name: `test`,
    description: `The bit that tests`,
    usage: `${prefix}test <fuck knows, depends what I'm testing>`,
    execute(message) {

    },
}