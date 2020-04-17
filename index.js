const Discord = require('discord.js');
const { token, prefix, Collection } = require('./config.json');
const config = require('./config.json');
const colours = require('./colours.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log(`[READY] Logged in as: ${client.user.tag}!` );
    client.user.setActivity(`for help type "!help"`);
});

// ----------------- MODERATING ---------------------

client.on('message', async message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  if(message.content.startsWith(prefix + 'kick')) {
    if(message.guild)
    return;
  let member = message.mentions.members.first();
  if(!message.member.hasPermission("BAN_MEMBERS"))
  return message.reply(":x: **You dont have enough permissions.**");
  if(!member) message.reply(":x: **The mentioned user cannot be found**")
  if(!member.bannable) message.reply(":x: **The mentioned user cannot be banned.**")
  let reason = args.slice(1).join(' ');
  if(!reason) reason = ":x: **Please select a reason.**";
  if(member) {
    await member.kick(reason)
    .catch(error => message.reply(`:x: :x: :x: **An error occured!: ${error}`));
     message.reply(`The Admin ${message.author.tag} Kicked ${member} for: ${reason}`)
  }    
  }
});

  client.on('message', async message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    if(message.content.startsWith(prefix + 'ban'))
    {

      if(!message.member.hasPermission("BAN_MEMBERS"))
        return message.reply(":x: **You dont have enough permissions.**");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply(":x: **Could not find the mentioned user.**");
    if(!member.bannable) 
      return message.reply(":x: **Unable to ban the mentioned user.**");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = ":x: **Please select a reason.**";
    
    await member.ban(reason)
      .catch(error => message.reply(`:x: :x: :x: **An error occured!: ${error}`));
        message.reply(`The Admin ${message.author.tag} Banned ${member} for: ${reason}`)
    }
  });

// ----------------- MODERATING ---------------------

// ----------------- HELP ---------------------------

client.on('message', message => {
  if(message.content.startsWith(prefix + 'help')) {
    const helpembed = new Discord.MessageEmbed()
    .setColor(colours.red_light)
    .setTitle('The commands list')
    .addField('**Moderation:**', '`ban (user) (reason)`, `kick (user)`')
    .addField('**Tools:**', '`say (text)`')
    message.channel.send(helpembed)
  }

});

// ----------------- HELP ---------------------

// ----------------- TOOLS ---------------------

client.on('message', async message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  if(message.content.startsWith(prefix + 'say')) {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
       message.reply('u cant do that u nn u just got logged on the console hf getting banned')  
       console.log(`${member}` + 'he said it!!!')  
    }
    else {
      const sayMessage = args.join(" ")
      message.delete().catch(wat=>{});
      message.channel.send(sayMessage);
    }
  }
});
client.on("message", async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g) //arguments
  const command = args.shift().toLowerCase(); //command

  if (message.content.indexOf(prefix) !== 0) return;
  
  if (command == "avatar") {

  var user;
  user = message.mentions.users.first(); //mentioned user, if any
  if (!user) { //if no one is mentioned
  if (!args[0]) { //if the command is only "!avatar". I.e. no one is mentioned and no id is specified
  user = message.author;
  getuseravatar(user);
  } else { //if a user id IS specified (need developer mode on on discord to get it)
  var id = args[0]
  client.fetchUser(id).then(user => {
  getuseravatar(user) //get avatar of the user, whose id is specified
  
  }).catch(error => console.log(error))
  
  }
  
  } else { //if someone IS mentioned
  getuseravatar(user);
  }
  function getuseravatar(user) {
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM") //can specifiy color of embed here
  .setImage(user.avatarURL)
  message.channel.send(embed)
  
  }
  
}


})

// ----------------- TOOLS ---------------------


// ----------------- stuff ---------------------

client.on('message', message => {
  if(message.content.startsWith(prefix + 'config gamesense')) {
    const helpembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle('**Config-uri pentru `skeet` :O**')
    .addField("**config nr1:** `xane config`")
    .addField("**config nr2:** `edward22 config`")
    message.channel.send(helpembed)
  }
});


// ----------------- stuff ---------------------

client.login(token);