const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class DownloadCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'download',
      usage: 'dl',
      description: 'Send the download FAQ message.',
      type: client.types.INFO
    });
  }
  async run(message) {
    message.channel.send('Apollo Client hasn\'t been released yet, but you can build it yourself using the source code at https://apolloclient.net/')
  }
};
