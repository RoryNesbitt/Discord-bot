module.exports = {
    name: `play`,
    description: `The bit that corrects you`,
    usage: `Try not to use this`,
    execute(message) {
        command = message.content.slice(prefix.length)
        user = `<@234395307759108106>`
        message.react(`❌`);
        message.channel.send(`If you are trying to use ${user} the command is \`-${command}\``);
    },
};
