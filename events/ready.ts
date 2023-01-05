import { REST, Routes, RESTPostAPIChatInputApplicationCommandsJSONBody as JsonBody } from "discord.js";
import CustomClient from "../handlers/CustomClient";
import * as process from "process";
(await import("dotenv")).config({path: "../config/.env"});

export default async (client: CustomClient) => {
    try {
        const commands: JsonBody[] = [];
        for (const command of client.commands.values()) {
            commands.push(command.command.toJSON());
        }

        const rest: REST = new REST({version: "10"}).setToken(process.env.TOKEN!);
        await rest.put(Routes.applicationCommands(process.env.APPID!), {body: commands});
    } catch (error) {
        console.log(error);
    }

    console.log("ready!");
}