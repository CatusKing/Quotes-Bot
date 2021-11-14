const {adminCh,botOwner} = require('../general/config.json');

module.exports = {
    name: 'quote',
    description: 'The command to post a request',
    options: [
        {
            type: 'STRING',
            name: 'quote',
            description: 'The quote you want to post',
            required: true
        },
        {
            type: 'STRING',
            name: 'author',
            description: 'Author of the quote',
            required: false
        }
    ],
    execute({ client, interaction, db }) {
        const banned = db.get('quotes.banned') || [];
        if (banned.includes(interaction.user.id)) return interaction.reply(`Sorry you've been banned from submitting quotes on this bot\nContact ${botOwner} if you think this is a mistake`);
        const next = db.get('quotes.nextNum') || 0;
        const author = interaction.options.getString('author') || 'No Specified Author';
        db.set(`quotes.${next}`, {
            quote: interaction.options.getString('quote'),
            author: author,
            approved: false,
            submittedOn: new Date().getTime(),
            submittedBy: interaction.user.id
        });
        db.add(`quotes.nextNum`, 1);
        interaction.reply(`Added\`\`\`${interaction.options.getString('quote')}\n\`\`\`to the quote db\nAuthor: ${author}\nId: #${next}`);
        client.channels.cache.get(adminCh).send(`New Quote\nId: #${next}\nSubmitted by: ${interaction.user}\nAuthor: ${author}\nQuote:\`\`\`${interaction.options.getString('quote')}\n\`\`\``);
    }
}