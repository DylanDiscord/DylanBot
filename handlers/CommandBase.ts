import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import CustomClient from "./CustomClient.js";

export type OCommandBuilder = Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
export abstract class CommandBase {
    public context: ChatInputCommandInteraction;
    public client: CustomClient;

    public constructor(cl: CustomClient, co: ChatInputCommandInteraction) {
        this.context = co;
        this.client = cl;
    }
    public abstract command: OCommandBuilder;
    public abstract run (): Promise<void>;
}