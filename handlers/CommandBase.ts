import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export type OCommandBuilder = Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
export abstract class CommandBase {
    public context!: ChatInputCommandInteraction;
    public enabled: boolean = true;

    public abstract command: OCommandBuilder;
    public abstract run (): Promise<void>;
}