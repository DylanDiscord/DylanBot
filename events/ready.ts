import { PresenceStatusData, REST, Routes } from "discord.js";
import * as process from "process";
import config from "../config/config.json" assert {type: "json"};
(await import("dotenv")).config({path: "../config/.env"});
import { performance } from "node:perf_hooks";
import { client } from "../exportMain.js";
import {CustomMethods} from "../handlers/CustomMethods.js";
import axios from "axios";

export default async () => {
    try {
        await (new REST({version: "10"}).setToken(process.env.TOKEN!))
            .put(Routes.applicationCommands(process.env.APPID!), {body: client.commands.filter(c => c.enabled).map(c => c.command.toJSON())});
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

    const {remaining, total} = await axios.get("https://discord.com/api/v10/gateway/bot", {headers: {Authorization: `Bot ${process.env.TOKEN}`}}).then(d => d.data.session_start_limit);

    performance.mark("end-loading");

    console.clear();
    console.log(`|✅  ready!\n|⏰  started in: ${Math.round(performance.measure("loading", "start-loading", "end-loading").duration) / 1000} Seconds.\n|❤️ You have ${remaining} of ${total} login attempts left.`);

    performance.clearMarks();
    performance.clearMeasures();
}