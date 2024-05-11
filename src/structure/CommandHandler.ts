import { ApplicationCommand, ApplicationCommandData, ButtonInteraction, Collection, CommandInteraction, CommandInteractionOptionResolver, Interaction, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { Bot } from "./Bot";

interface CommandProps{
    client: Bot,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver
}

export type ComponentsButton = Collection<string, (Interaction: ButtonInteraction) => any>
export type ComponentSelect = Collection<string, (Interaction: StringSelectMenuInteraction) => any>
export type ComponentModal = Collection<string, (Interaction: ModalSubmitInteraction) => any>

interface CommandComponents{
    buttons?: ComponentsButton;
    selects?: ComponentSelect;
    modals?: ComponentModal;
}

export type CommandType = ApplicationCommandData & CommandComponents & {
    run(props: CommandProps): any
}

export class Command{
    constructor(options: CommandType){
        options.dmPermission = false;
        Object.assign(this, options);
    }
}