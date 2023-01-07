import { PresenceStatusData, REST, Routes } from "discord.js";
import CustomClient from "../handlers/CustomClient.js";
import * as process from "process";
import config from "../config/config.json" assert {type: "json"};
(await import("dotenv")).config({path: "../config/.env"});

export default async (client: CustomClient) => {
    try {
        const rest: REST = new REST({version: "10"}).setToken(process.env.TOKEN!);
        await rest.put(Routes.applicationCommands(process.env.APPID!), {body: client.commands.map(c => c.command.toJSON())});
    } catch (error) {
        console.log(error);
    }

    let intervalIndex: number = 0;
    setInterval(async () => {
        client.user!.setPresence({
            status: config.status[intervalIndex].status as PresenceStatusData,
            activities: [{
                name: config.status[intervalIndex].name,
                type: config.status[intervalIndex].type,
            }]
        });
        intervalIndex = config.status.length - 1 == intervalIndex ? 0 : intervalIndex + 1;
    }, 10800000);

    console.log("ready!");
}