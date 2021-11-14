const {botOwnerId,adminG,adminACh} = require('../general/config.json');

module.exports = {
    name: 'approve',
    description: 'The command to approve a quote',
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
    ],
    execute({ client, interaction, db }) {
        if (interaction.user.id !== botOwnerId) {
            const quote = db.get(`quotes.${interaction.options.getInteger('quote-id')}`);
            if (!quote) interaction.reply('I couldn\'t find a quote with that id');
            else {
                quote.approved = interaction.options.getBoolean('status');
                quote.denied = !interaction.options.getBoolean('status');
                db.set(`quotes.${interaction.options.getInteger('quote-id')}`, quote);
                interaction.reply(`Set Id: #${interaction.options.getInteger('quote-id')} to ${interaction.options.getBoolean('status')}`);
                if (quote.approved) {
                    client.guilds.cache.get(adminG).channels.cache.get(adminACh).send(`New Quote by ${quote.author}!\n\`\`\`${quote.quote}\n\`\`\``).then(msg => {
                        msg.crosspost().then();
                    });
                }
            }
        } else interaction.reply(`Sorry you don't have permission to do this!`);
    }
}