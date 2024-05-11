import { GenAI } from "./GenAI";
import * as fs from "fs"

export class CommandHandler{
    private configImport: any = fs.readFileSync("./src/config.json", "utf8");
    private config: any = JSON.parse(this.configImport);
    private genAI = new GenAI(this.config.api.gemini, 'gemini-1.0-pro');
    
    constructor(){}

    public async handleCommand(input: string): Promise<string>{
        let inputList: string[] = input.split(" ");
        if(inputList[1] == "help" && inputList[2] == undefined) return this.handleHelp();

        const command: string = inputList[0];
        inputList.shift();
        const prompt: string = inputList.join(" ");
        let answer: string = await this.genAI.helperChat([command, prompt]);
        return answer;
    }

    private handleHelp(){
        return "Comandos: help, translate";
    }
}