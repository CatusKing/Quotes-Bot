const { Client, Intents, Collection} = require('discord.js');
const db = require('quick.db');
const fs = require("fs");
const intents = [Intents.FLAGS.GUILDS];
const client = new Client({ intents: intents });
const token = require('./general/token.json');
const {adminG} = require('./general/config.json');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Setting up slash commands');
    const commands = [];
    const guildCommands = [];
    client.commands.forEach((value) => {
        if (value.guild == null) {
            commands.push({
                name: value.name,
                description: value.description,
                options: value.options
            });
        } else {
            guildCommands.push({
                name: value.name,
                description: value.description,
                options: value.options
            });
        }
    });
    client.application.commands.set(commands).then();
    client.application.commands.set(guildCommands, adminG).then();
    console.log('Finished setting up slash commands');
    setInterval(() => {
        client.user.setActivity(`${client.guilds.cache.size} Guilds`, {type: 'WATCHING'})
    }, 60000)
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) {
        client.commands.get(interaction.commandName).execute({client, interaction, db});
    }
});

client.login(token.bot).then();