import { BitFieldResolvable, Client, GatewayIntentsString, IntentsBitField, Partials } from "discord.js";
export class Bot extends Client{
    constructor(apiKey: string){
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
            partials: [
                Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message,
                Partials.Reaction, Partials.ThreadMember, Partials.User
            ]
        });
        this.login(apiKey);
    }
}