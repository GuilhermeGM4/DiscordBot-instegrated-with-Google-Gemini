import * as fs from "fs"
import { EnhancedGenerateContentResponse, GenerateContentResult } from "@google/generative-ai";
import { Events } from "discord.js"
import { Bot } from "./structure/Bot";
import { GenAI } from "./structure/GenAI";
import { CommandHandler } from "./structure/CommandHandler";
import * as dotenv from "dotenv"
dotenv.config();

const configImport: any = fs.readFileSync("./src/config.json", "utf8");
const config: any = JSON.parse(configImport);

//initializing discord.js
const bot: Bot = new Bot(process.env.DISCORD_TOKEN as string);

//initializing gemini api
const genAI: GenAI = new GenAI(process.env.GEMINI_TOKEN as string, 'gemini-1.0-pro');

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
    let answer: string = "Não foi possivel gerar a resposta.";
    try{
        answer = await commandHandler.handleCommand(messageText)
    }catch(e){
        console.error(e);
    }
    
    message.reply({
        content: answer
    });
});