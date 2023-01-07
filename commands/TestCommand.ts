import { ICommandBase, OCommandBuilder } from "../handlers/ICommandBase.js";
import CustomClient from "../handlers/CustomClient.js";
import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
export default class TestCommand implements ICommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command");

    async run(client: CustomClient, interaction: ChatInputCommandInteraction): Promise<void> {
        console.log(JSON.stringify(Object.fromEntries(client.database.tables), null, 2));
        await interaction.reply({content: "Hello!", ephemeral: true});
    }
}