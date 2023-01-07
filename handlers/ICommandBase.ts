import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import CustomClient from "./CustomClient.js";

export type OCommandBuilder = Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
export interface ICommandBase {
    command: OCommandBuilder;
    run (client: CustomClient, interaction: ChatInputCommandInteraction): Promise<void>;
}