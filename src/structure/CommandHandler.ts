import { GenAI } from "./GenAI";
import * as fs from "fs"

export class CommandHandler{
    private configImport: any = fs.readFileSync("./src/config.json", "utf8");
    private config: any = JSON.parse(this.configImport);
    private genAI = new GenAI(this.config.api.gemini, 'gemini-1.0-pro');
    
    constructor(){}

    public handleCommand(command: string): string{
        const commandList: string[] = command.split(" ");
        if(commandList[1] == "help"){
            if(commandList[2] != undefined){
                this.handleHelp(true);
            }
            this.handleHelp()
        }
        return "";
    }

    private handleHelp(ai: boolean = false){
        if (ai){
            console.log("IA será utilizada.");
            return;
        }

        console.log("IA não utilizada");
    }
}