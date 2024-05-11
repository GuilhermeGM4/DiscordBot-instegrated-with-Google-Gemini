import { GenAI } from "./GenAI";
import * as fs from "fs"
import * as dotenv from "dotenv"
dotenv.config();

export class CommandHandler{
    private configImport: any = fs.readFileSync("./src/config.json", "utf8");
    private config: any = JSON.parse(this.configImport);
    private genAI = new GenAI(process.env.GEMINI_TOKEN as string, 'gemini-1.5-pro-latest');
    
    constructor(){}

    public async handleCommand(input: string): Promise<string>{
        let inputList: string[] = input.split(" ");

        if(inputList[0] == "help" && inputList[1] == undefined) return this.handleHelp();

        const command: string = inputList[0];
        inputList.shift();
        const prompt: string = inputList.join(" ");
        let answer: string = "";
        try{
            answer = await this.genAI.helperChat([command, prompt]);
        }catch(e){
            console.error(e);
        }
        return answer;
    }

    private handleHelp(){
        return "Comandos: help, translate";
    }
}