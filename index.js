//------Discord.js------
const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client()
const bdd = require("./config.json");
const { fstat } = require("fs");
const fs = require("fs")
const covid = require('novelcovid')
const fetch = require('node-fetch')
const querystring = require('querystring')




///-----Connexion-----
bot.login(config.token)
bot.on("ready", async Message => {
    console.log("je suis pret !")
    bot.user.setPresence({status: "idle"})
    
})


bot.on("message", async message => {
    if(message.content === "Yo"){
        message.channel.send("Yo khey")
    }
})


//------Message de bienvenue------

bot.on("guildMemberAdd", async member => {
    let Bienvenue = bot.guilds.cache.get("797876925997121536").channels.cache.get("797876925997121536")


    member.roles.add("idée du role")


    Bienvenue.send(`Bienvenue a toi ${member}`)

    let embed = new Discord.Message()
    .setTitle("Salut a toi"+member)
    Bienvenue.send(embed)
})

bot.on("guildMemberRemove", async member => {
    let Bienvenue = bot.guilds.cache.get("797876925997121536").channels.cache.get("797876925997121536")
    
    Bienvenue.send(`Aurevoir a toi ${member.user.username}`)
})


//------Reaction/Interaction------

bot.on("message", async message => {
    if(message.content === "!IS"){
        let embed = new Discord.MessageEmbed()
        .setTitle("GINA")
       let msg = await message.channel.send(embed)

       await msg.react("✅")
       await msg.react("❌")
    }
})

bot.on("raw", event => {
    if(event.t === "MESSAGE_REACTION_ADD"){
        if(event.d.message_id === "id du msg"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "🤩"){
                member.roles.add("id du role")
            }else if(event.d.emoji.name === "😏" ){
                channel.send("OK")
            }
        }
    }
})

bot.on("message", message => {
    
    if(message.content.startsWith("!clear")){
        message.delete();
        if(message.member.hasPermission('MANAGE_MESSAGES')){

            let args = message.content.trim().split(/ +/g);

            if(args[1]){
                if(!isNaN(args[1]) && args[1] >= 1  && args[1] <= 99 ){

                    message.channel.bulkDelete(args[1])
                    message.channel.send(`Vous avez supprimé ${args[1]} message(s)`)


                }
                else{
                    message.channel.send(`Vous devez indiquer une valeur entre 1 et 99 !`)
                }

                
            }
            else{
                message.channel.send(`Vous devez indiquer un nombre de messages a supprimer !`)
            }
                   
        }
        
    }
})


        
//------Covid-19------

bot.on('message', async message => {
    if(message.content.startsWith("covid")){
        const covidStats = await covid.all()

        return message.channel.send(new Discord.MessageEmbed()
           .setTitle('Covid-19 Stastistique')
           .setColor("BLUE")
           .addFields(
               { name: `Cas Total`, value: covidStats.cases.toLocaleString(), inline: true },
               { name: `Nouveaux cas aujourd'hui`, value: covidStats.todayCases.toLocaleString(), inline: true },
               { name: `Morts`, value: covidStats.deaths.toLocaleString(), inline: true },
               { name: `Morts Aujourd'hui`, value: covidStats.todayDeaths.toLocaleString(), inline: true },
               { name: `Guéris`, value: covidStats.recovered.toLocaleString(), inline: true },
               { name: `Guéris Aujourd'hui`, value: covidStats.todayRecovered.toLocaleString(), inline: true },
               { name: `Infecté`, value: covidStats.active.toLocaleString(), inline: true },
               { name: `Personne en réanimation`, value: covidStats.critical.toLocaleString(), inline: true },
               { name: `Testé`, value: covidStats.tests.toLocaleString(), inline: true },
           )
        )
    }
})

bot.on("message", async message => {
    if(message.content.startsWith(":say")){
        message.delete()
        let msg = message.content.slice(4)
        if(!msg) return message.reply("veuillez entrez un message.")

        let embed = new Discord.MessageEmbed()
        .setDescription(msg)
        message.channel.send(embed)
    }
})

bot.on("message", async message => {
    if(message.content === "ping"){
        let msg = await message.channel.send("ping en cours . . . .")

        let embed = new Discord.MessageEmbed()
        .addField("Votre ping est de : ", Math.floor(message.createdAt - message.createdAt))
        .addField("Ma latence est de :", bot.ws.ping)
        message.channel.send(embed)
        msg.delete()

    }
})

bot.on("message" , async message =>{
    if(message.content === "salut"){
        let tab = [
            "Salut",
            "bonsoir",
            "Bonjour"
        ]
        let index = Math.floor(Math.random() * (tab.length))
        message.channel.send(tab[index])
    }
})


bot.on("message", async message => {
    if(message.content.startsWith("sug")){
        let msg = message.content.slice(4)
        if(!msg) return message.reply("msg")

        let embed = new Discord.MessageEmbed()
        .addField("Nouvelle suggestion de "+message.author.username, msg)
        let msgreaction = await message.channel.send(embed)

        await msgreaction.react("✅")
        await msgreaction.react("❌")
    }
})




