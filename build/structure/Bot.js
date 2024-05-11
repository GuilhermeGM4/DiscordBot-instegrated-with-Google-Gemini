"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
// import * as fs from "fs"
class Bot extends discord_js_1.Client {
    constructor(apiKey) {
        super({
            intents: Object.keys(discord_js_1.IntentsBitField.Flags),
            partials: [
                discord_js_1.Partials.Channel, discord_js_1.Partials.GuildMember, discord_js_1.Partials.GuildScheduledEvent, discord_js_1.Partials.Message,
                discord_js_1.Partials.Reaction, discord_js_1.Partials.ThreadMember, discord_js_1.Partials.User
            ]
        });
        this.login(apiKey);
    }
}
exports.Bot = Bot;
