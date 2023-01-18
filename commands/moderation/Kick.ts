import {CommandBase, OCommandBuilder} from "../../exportMain.js";
import {SlashCommandBuilder} from "discord.js";

export default class Kick extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Expulsa a un usuario");

    override enabled = false;

    async run(): Promise<void> {

    }

}