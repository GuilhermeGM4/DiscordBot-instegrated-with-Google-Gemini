import { BitFieldResolvable, Client, GatewayIntentsString, IntentsBitField, Partials } from "discord.js";
// import * as fs from "fs"

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

    // private start(){
    //     const configImport: any = fs.readFileSync("./src/config.json", "utf8");
    //     const config: any = JSON.parse(configImport);

    //     const discordApi: string = config.api.discord;
    //     this.login(discordApi);
    // }
}