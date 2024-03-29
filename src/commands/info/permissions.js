const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const permissions = require('../../utils/permissions.json');
const { oneLine } = require('common-tags');

module.exports = class PermissionsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'permissions',
      aliases: ['perms'],
      usage: 'permissions [user mention/ID]',
      description: oneLine`
        Displays all current permissions for the specified user. 
        If no user is given, your own permissions will be displayed.
      `,
      type: client.types.INFO,
      examples: ['permissions @Apollo']
    });
  }
  run(message, args) {
    const member =  this.getMemberFromMention(message, args[0]) || 
      message.guild.members.cache.get(args[0]) || 
      message.member;
    const memberPermissions = member.permissions.toArray().sort((a, b) => {
      return Object.keys(permissions).indexOf(a) - Object.keys(permissions).indexOf(b);
    }).map(p => '`' + permissions[p] + '`').join('\n');
    const embed = new MessageEmbed()
      .setTitle(`${member.displayName}'s Permissions`)
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(memberPermissions)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(member.displayHexColor);
    message.channel.send(embed);
  }
};