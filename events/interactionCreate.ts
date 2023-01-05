import CustomClient from "../handlers/CustomClient";
import { CommandInteraction } from "discord.js";

export default async (client: CustomClient, interaction: CommandInteraction) => {
    if (interaction.isCommand()) {
        await client.commands.get(interaction.commandName)!.run(client, interaction);
    }
}