import { EnhancedGenerateContentResponse, GenerateContentResult, GenerationConfig, GenerativeModel, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, Part, SafetySetting } from "@google/generative-ai";
import * as fs from "fs"

export class GenAI extends GoogleGenerativeAI{
    private model: GenerativeModel;

    private config: any = this.importConfig();

    private harassmentParts: Part[] = this.config.harassmentParts;
    private helperParts: Part[] = this.config.helperParts;

    constructor(apiKey: string, model: string){
        super(apiKey);
        this.model = this.getGenerativeModel({model: model});
    }

    private importConfig(){
        const configImport: any = fs.readFileSync("./src/config.json", "utf8");
        const allConfig: any = JSON.parse(configImport);
        return allConfig.geminiConfig;
    }

    public getModel(): GenerativeModel{
        return this.model;
    }

    public setModel(model: string){
        this.model = this.getGenerativeModel({model: model});
    }

    public async verifySpeech(prompt: any): Promise<string>{
        let parts: Part[] = [];
        parts = parts.concat(this.harassmentParts);

        const generationConfig: GenerationConfig = this.config.generation;
        const safetySettings: SafetySetting[]= [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            }
        ];

        parts.push({text: "Input: " + prompt});

        const result: GenerateContentResult = await this.model.generateContent({
            contents: [{role: "user", parts}],
            generationConfig,
            safetySettings
        });

        const response: EnhancedGenerateContentResponse = result.response;
        return this.messageHandler(response.text());
    }

    private messageHandler(response: string): string{
        let responseSplited: string[] = response.trim().split("::");

        if(responseSplited[2].trim() == "Não") return "Não";

        let newResponse: string;
        let ResponseArray: string[] = [responseSplited[6], "Motivo:", responseSplited[4]];
        newResponse = ResponseArray.join(" ");

        return newResponse;
    }

    public async helperChat(input: string[]): Promise<any>{
        let parts: Part[] = this.helperParts;
        parts = parts.concat(this.harassmentParts);
        const safetySettings = [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            }
        ];

        const generationConfig: GenerationConfig = this.config.generation;
        parts.push(
            {text: "::comando:: " + input[0]},
            {text: "::prompt::" + input[1]}
        );

        const result: GenerateContentResult = await this.model.generateContent({
            contents: [{role: "user", parts}],
            generationConfig,
            safetySettings
        });

        const response: EnhancedGenerateContentResponse = result.response;

        let answer: string = response.text();

        return answer;
    }
}