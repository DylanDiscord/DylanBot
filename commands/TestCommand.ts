import { CommandBase, OCommandBuilder } from "../handlers/CommandBase.js";
import { SlashCommandBuilder } from "discord.js";
export default class TestCommand extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command");

    async run(): Promise<void> {
        console.log(JSON.stringify(Object.fromEntries(this.client.database.tables), null, 2));
        await this.context.reply({content: "Hello!", ephemeral: true});
    }
}