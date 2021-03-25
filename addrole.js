const Discord = require('discord.js');
const colors = require('../colors.json);
                      
module.exports.run async(bot, message, args) => {
  if (!message.member.permissions.have(["ADMINISTRATOR","MANAGE_ROLES"]))
    return message.channel.send(
      "You lack the permissions to manage roles, please contact higher staff");
  
 let rMember =
    message.mentions.members.first() ||
    message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
    message.guild.members;
  let role =
    message.guild.roles.cache.find((r) => r.name == args[1]) ||
    message.guild.roles.cache.find((r) => r.id == args[1]) ||
    message.mentions.roles.first();
  if (!role)
    return message.channel.send(
      "Which role do I give to this user?"
    );

  if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
    return message.channel.send(
      "I do not have permissions to preform this command."
    );

  if (rMember.roles.has(role.id)) {
    return message.channel.send(
      `$rMember.displayName), already has this role!`
    );
  } else {
    await rMember.roles.add(role.id).catch((e) => console.log(e));
    message.channel.send(
      `The role ${role.name} has been added to ${rMember.displayName}.`
    );
  }

  let embed = new Discord.MessageEmbed()
    .setColor(colors.orange)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
    .addField("Staff:", "Addrole")
    .addField("Mute:", rMember.user.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt);

  let sChannel = message.guild.channels.cache.find(
    (c) => c.name === "ticket-logs"
  );
  sChannel.send(embedVariable);
};

module.exports.config = {
  name: "addrole",
  description: "Add roles through bot",
  usage: ".addrole",
  accessableby: "Staff",
  aliases: ["ar", "roleadd"],
};
  
