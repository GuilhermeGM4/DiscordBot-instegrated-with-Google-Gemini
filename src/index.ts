import * as fs from "fs"
import { EnhancedGenerateContentResponse, GenerateContentResult } from "@google/generative-ai";
import { Events } from "discord.js"
import { Bot } from "./structure/Bot";
import { GenAI } from "./structure/GenAI";
import { CommandHandler } from "./structure/CommandHandler";

const configImport: any = fs.readFileSync("./src/config.json", "utf8");
const config: any = JSON.parse(configImport);

//initializing discord.js
const bot: Bot = new Bot(config.api.discord);

//initializing gemini api
const genAI: GenAI = new GenAI(config.api.gemini, 'gemini-1.0-pro');

//now the bot is ready to be used
bot.once(Events.ClientReady, readyClient =>{
    bot.user?.setStatus('online');
    bot.user?.setActivity('!c prefixo');
    console.log(`Pronto para uso, logado como ${readyClient.user.tag}`);
});

bot.on('messageCreate', async message => {
    if (message.author.bot) return;

    const commandHandler: CommandHandler = new CommandHandler();

    let messageText: string = message.toString();

    if (!message.content.startsWith(config.prefix + " ")){
        try{
            let answer: string = await genAI.verifySpeech(messageText)

            if(answer == "Não") return;

            // message.channel.send(messageText);
            message.reply({
                content: answer
            });
        } catch(e){
            console.error(e);
        }
        return;
    }

    let textArray: string[] = messageText.split(" ");
    textArray.shift();
    messageText = textArray.join(" ");
    const answer: string = await commandHandler.handleCommand(messageText)
    console.log(answer);
    message.reply({
        content: answer
    });
});