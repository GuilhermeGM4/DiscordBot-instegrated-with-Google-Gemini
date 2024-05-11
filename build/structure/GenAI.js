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
exports.GenAI = void 0;
const generative_ai_1 = require("@google/generative-ai");
const fs = __importStar(require("fs"));
class GenAI extends generative_ai_1.GoogleGenerativeAI {
    constructor(apiKey, model) {
        super(apiKey);
        this.config = this.importConfig();
        this.parts = this.config.parts;
        this.model = this.getGenerativeModel({ model: model });
    }
    importConfig() {
        const configImport = fs.readFileSync("./src/config.json", "utf8");
        const allConfig = JSON.parse(configImport);
        return allConfig.geminiConfig;
    }
    getModel() {
        return this.model;
    }
    setModel(model) {
        this.model = this.getGenerativeModel({ model: model });
    }
    verifySpeech(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            // let parts: Part[] = this.parts;
            let parts = [];
            parts = parts.concat(this.parts);
            const generationConfig = this.config.generation;
            const safetySettings = [
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                }
            ];
            parts.push({ text: "Input: " + prompt });
            const result = yield this.model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig,
                safetySettings
            });
            const response = result.response;
            return yield this.messageHandler(response.text());
        });
    }
    messageHandler(response) {
        let responseSplited = response.trim().split("::");
        console.log(responseSplited);
        if (responseSplited[2].trim() == "Não")
            return "Não";
        let newResponse;
        let ResponseArray = [responseSplited[6], "Motivo:", responseSplited[4]];
        newResponse = ResponseArray.join(" ");
        return newResponse;
    }
}
exports.GenAI = GenAI;
