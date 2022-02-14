const { Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const Wordle = require("./wordle.js");

client.once('ready', () => {
    console.log('The bot is online!');
});

client.on('messageCreate', async msg => 
{
    //check for permission to post
    permision = msg.channel.permissionsFor(client.user);
    permision = permision.toArray();

    //dont respond to own messages
    if(msg.author.username === client.user.username) {return;}

    //loads a new wordle game
    if(msg.content.includes("!wp"))
    {
        Wordle.LoadNewWordle(msg);
    }
    //wordle game help
    if(msg.content.includes("!wh"))
    {
        msg.reply("Play game: !wp\nGuess: !g -----\nWordle Stats: !ws");
    }
    //makes a guess in a wordle game
    if(msg.content.includes("!g"))
    {
        //search word in list
        var guess = msg.content.split(" ")[1];
        guess = guess.toUpperCase();
        var sonuc = answers.indexOf(guess);
        if(sonuc >= 0)
        {
            Wordle.PlayWordle(msg);
        }
        else
        {
            msg.reply("This word is not available in the list.");
        }
        
    }
    //shows your stats
    if(msg.content.includes("!ws"))
    {
        Wordle.ShowWordleStats(msg);
    }

    if(msg.content.includes("!player"))
    {
        msg.reply(msg.author.username);
    }
});

//client.login("OTQyNDY2Njk4MjExMTE1MTI5.Ygk6gw.Ua2oBakYWjk1HY-aHF6GUGuSsEQ");
const dotenv = require('dotenv');
dotenv.config();
client.login(process.env.API_KEY);