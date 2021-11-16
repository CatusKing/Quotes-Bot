module.exports = {
    name: 'readme',
    description: 'Informational command about the bot',
    options: [],
    execute({ interaction }) {
        interaction.reply(`Hi, I'm a bot that allows anyone to quote stupid random things people say. To add my random quotes that are approved by a moderator go to my server and follow the quotes channel! To use me in your discord you can invite me using /invite. All quotes are approved by a moderator and we have spam protection! Also note that you can and may be banned from using the bot if you abuse the commands.`);
    }
}