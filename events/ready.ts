import { PresenceStatusData, REST, Routes } from "discord.js";
import * as process from "process";
import config from "../config/config.json" assert {type: "json"};
(await import("dotenv")).config({path: "../config/.env"});
import { performance } from "node:perf_hooks";
import { client } from "../exportMain.js";
import {CustomMethods} from "../handlers/CustomMethods.js";

export default async () => {
    try {
        const rest: REST = new REST({version: "10"}).setToken(process.env.TOKEN!);
        await rest.put(Routes.applicationCommands(process.env.APPID!), {body: client.commands.filter(c => c.enabled).map(c => c.command.toJSON())});
    } catch (error) {
        console.log(error);
    }

    const parsedConfig: any = CustomMethods.parseJsonVariables(config);

    function changeStatus(ref: {index: number, parsedConfig: any}) {
        client.user!.setPresence({
            status: config.status[ref.index].status as PresenceStatusData,
            activities: [{
                name: ref.parsedConfig.status[ref.index].name,
                type: ref.parsedConfig.status[ref.index].type,
            }]
        });
        ref.index = ref.parsedConfig.status.length - 1 == ref.index ? 0 : ref.index + 1;
    }

    let intervalIndex: number = 0;
    changeStatus({index: intervalIndex, parsedConfig: parsedConfig});
    setInterval(() => changeStatus({index: intervalIndex, parsedConfig: parsedConfig}), 100000);

    performance.mark("end-loading");

    console.log(`ready!\nstarted in: ${Math.round(performance.measure("loading", "start-loading", "end-loading").duration) / 1000} Seconds.`);

    performance.clearMarks();
    performance.clearMeasures();
}