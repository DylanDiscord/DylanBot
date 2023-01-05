import ICommandBase from "../handlers/ICommandBase";
import CustomClient from "../handlers/CustomClient";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";

export default class TestCommand implements ICommandBase {
    command: SlashCommandBuilder = new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command");

    async run(client: CustomClient, interaction: CommandInteraction): Promise<void> {
        await interaction.reply({content: "Hello!", ephemeral: true});
    }
}