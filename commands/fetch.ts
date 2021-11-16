const {botOwner} = require('../general/config.json');

module.exports = {
    name: 'fetch',
    description: 'The command to fetch a quote',
    options: [
        {
            type: 'INTEGER',
            name: 'quote-id',
            description: 'The id of the quote you want to fetch',
            required: true
        }
    ],
    execute({ interaction, db }) {
        const quote = db.get(`quotes.${interaction.options.getInteger('quote-id')}`) || {quote: 'no quote matches this id :(',author: 'quote.db',approved: true};
        if (quote.denied) {
            interaction.reply(`Sorry this quote was denied :(\nContact ${botOwner} for more information`);
        } else if (!quote.approved) {
            interaction.reply(`Sorry this quote has not been approved yet\nContact ${botOwner} if the quote has not been approved within 24 hours`);
        } else {
            interaction.reply(`Id: #${interaction.options.getInteger('quote-id')}\nAuthor: ${quote.author}\nQuote: \`\`\`${quote.quote}\n\`\`\``);
        }
    }
}