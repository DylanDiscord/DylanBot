import { ChatInputCommandInteraction, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export type OCommandBuilder = Omit<SlashCommandSubcommandsOnlyBuilder, "addSubcommand" | "addSubcommandGroup">;
export abstract class CommandBase {
    public context!: ChatInputCommandInteraction;
    public enabled: boolean = true;
    public use_count: number = 0;

    public abstract command: OCommandBuilder;
    public abstract run (): Promise<void>;
}