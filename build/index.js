"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const discord_js_1 = require("discord.js");
const Bot_1 = require("./structure/Bot");
const GenAI_1 = require("./structure/GenAI");
const configImport = fs.readFileSync("./src/config.json", "utf8");
const config = JSON.parse(configImport);
//initializing discord.js
const bot = new Bot_1.Bot(config.api.discord);
//initializing gemini api
const genAI = new GenAI_1.GenAI(config.api.gemini, 'gemini-1.0-pro');
//now the bot is ready to be used
bot.once(discord_js_1.Events.ClientReady, readyClient => {
    var _a, _b;
    (_a = bot.user) === null || _a === void 0 ? void 0 : _a.setStatus('online');
    (_b = bot.user) === null || _b === void 0 ? void 0 : _b.setActivity('!c prefixo');
    console.log(`Pronto para uso, logado como ${readyClient.user.tag}`);
});
bot.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    let messageText = message.toString();
    if (!message.content.startsWith(config.prefix + " ")) {
        try {
            messageText = yield genAI.verifySpeech(messageText);
            if (messageText == "Não")
                return;
            // message.channel.send(messageText);
            message.reply({
                content: messageText
            });
        }
        catch (e) {
            console.error(e);
        }
    }
}));
