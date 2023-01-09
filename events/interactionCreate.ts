import CustomClient from "../handlers/CustomClient.js";
import { CommandInteraction } from "discord.js";
import {CommandBase} from "../handlers/CommandBase";

export default async (client: CustomClient, interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand()) {
        const context: CommandBase = client.commands.get(interaction.commandName)!;
        context.context = interaction;
        await context!.run();
    }
}