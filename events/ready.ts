import { PresenceStatusData, REST, Routes } from "discord.js";
import CustomClient from "../handlers/CustomClient.js";
import * as process from "process";
import config from "../config/config.json" assert {type: "json"};
(await import("dotenv")).config({path: "../config/.env"});

export default async (client: CustomClient) => {
    try {
        const rest: REST = new REST({version: "10"}).setToken(process.env.TOKEN!);
        await rest.put(Routes.applicationCommands(process.env.APPID!), {body: client.commands.filter(c => c.enabled).map(c => c.command.toJSON())});
    } catch (error) {
        console.log(error);
    }

    function changeStatus(ref: {index: number}) {
        {
            client.user!.setPresence({
                status: config.status[ref.index].status as PresenceStatusData,
                activities: [{
                    name: config.status[ref.index].name,
                    type: config.status[ref.index].type,
                }]
            });
            ref.index = config.status.length - 1 == ref.index ? 0 : ref.index + 1;
        }
    }
    let intervalIndex: number = 0;
    changeStatus({index: intervalIndex});
    setInterval(() => changeStatus({index: intervalIndex}), 100000);

    console.log("ready!");
}