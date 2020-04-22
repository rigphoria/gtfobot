const Discord = require('discord.js');
const client = new Discord.Client();

let players = [];

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content === '!qtfo' || message.content === '!queue') {
        if(players.indexOf(message.author) === -1){
            players.push(message.author);
            message.channel.send(message.author.username + " has successfully queued");
            if(players.length === 4){
                for(let i = 0; i < players.length; i++){
                    players[i].send("4 people have queued! You're up, pardner. " + players[0].username + ", " + players[1].username + ", " + players[2].username + ", " + players[3].username +" are ready to play");
                }
                players = [];
            }
        } else {
            message.channel.send(message.author.username + " is already in the queue");
        }
    } else if(message.content === "!removeme"){
        let index = players.indexOf(message.author);
        players.splice(index, 1);
        message.channel.send(message.author.username + " has been removed from the queue");
    } else if(message.content === '!ready'){
        if(players.length === 1){
            message.channel.send(players[0].username + " is ready to play");
        } else {
            let reply = "";
            for(let i = 0; i < players.length; i++){
                reply += players[i].username;
                if(i < players.length - 1){
                    reply += ", ";
                }
            }
            reply += " are ready to play";
            message.channel.send(reply);
        }
    } else if(message.content === '!readydm'){
        if(players.length === 1){
            message.author.send(players[0].username + " is ready to play");
        } else {
            let reply = "";
            for(let i = 0; i < players.length; i++){
                reply += players[i].username;
                if(i < players.length - 1){
                    reply += ", ";
                }
            }
            reply += " are ready to play";
            message.author.send(reply);
        }
    } else if(message.content === "!commands"){
        message.channel.send("Commands: !qtfo or !queue to add yourself to the queue. !removeme to remove yourself from the queue. !ready to get a list of players currently in the queue.");
    }
});

client.login('LOGIN_CODE_GOES_HERE');