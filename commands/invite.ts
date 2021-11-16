const {website,discord} = require('../general/config.json')

module.exports = {
    name: 'invite',
    description: 'Send the guild invite and bot invite',
    options: [],
    execute({ interaction }) {
        interaction.reply(`Invite me to your guild by going [here](${website})\n\nOR\n\nAdd the quotes channel to your discord by joining [here](${discord}) and following the quotes channel`)
    }
}