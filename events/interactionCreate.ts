import CustomClient from "../handlers/CustomClient.js";
import { CommandInteraction } from "discord.js";

export default async (client: CustomClient, interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand()) {
        await client.commands.get(interaction.commandName)!.run(client, interaction);
    }
}