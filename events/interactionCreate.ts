import { CommandInteraction } from "discord.js";
import { CommandBase } from "../handlers/CommandBase.js";
import { client } from "../exportMain.js";

export default async (interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand()) {
        const context: CommandBase = client.commands.get(interaction.commandName)!;
        context.context = interaction;
        context.use_count++;
        await context!.run();
    }
}