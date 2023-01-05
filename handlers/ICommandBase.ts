import { SlashCommandBuilder } from "discord.js";
import CustomClient from "./CustomClient";

export default interface ICommandBase {
    command: SlashCommandBuilder;
    run (client: CustomClient, ...args: any): Promise<void>;
}