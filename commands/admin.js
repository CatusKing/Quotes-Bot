const {botOwnerId, adminG, adminACh} = require('../general/config.json');

module.exports = {
    name: 'admin',
    description: 'General admin commands',
    guild: adminG,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'approve',
            description: 'The command to approve quotes',
            options: [
                {
                    type: 'INTEGER',
                    name: 'quote-id',
                    description: 'The id of the quote you want to approve',
                    required: true
                },
                {
                    type: 'BOOLEAN',
                    name: 'status',
                    description: 'Approve or Deny',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'ban',
            description: 'Ban a user from using the bot',
            options: [
                {
                    type: 'INTEGER',
                    name: 'user',
                    description: 'The user you want to ban',
                    required: true
                }
            ]
        }
    ],
    execute({client, interaction, db}) {
        if (interaction.user.id !== botOwnerId) {
            if (interaction.options.getSubcommand('approve')) {
                const quote = db.get(`quotes.${interaction.options.getInteger('quote-id')}`);
                if (!quote) interaction.reply('I couldn\'t find a quote with that id');
                else {
                    quote.approved = interaction.options.getBoolean('status');
                    quote.denied = !interaction.options.getBoolean('status');
                    db.set(`quotes.${interaction.options.getInteger('quote-id')}`, quote);
                    interaction.reply(`Set Id: #${interaction.options.getInteger('quote-id')} to ${interaction.options.getBoolean('status')}`);
                    if (quote.approved) {
                        client.guilds.cache.get(adminG).channels.cache.get(adminACh).send(`New Quote said by ${quote.author}! This was submitted on <t:${Math.floor(quote.submittedOn / 1000)}:f>\n\`\`\`${quote.quote}\n\`\`\``).then(msg => {
                            msg.crosspost().then();
                        });
                    }
                }

            } else if (interaction.options.getSubcommand('ban')) {
                db.push('quotes.banned', interaction.options.getInteger('user'));
                interaction.reply(`Banned user ${interaction.options.getInteger('user')}`);
            }
        } else interaction.reply(`Sorry you don't have permission to do this!`);
    }
}