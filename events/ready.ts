import { PresenceStatusData, REST, Routes } from "discord.js";
import * as process from "process";
import { Config } from "../exportMain.js";
(await import("dotenv")).config({path: "../config/.env"});
import { performance } from "node:perf_hooks";
import { client } from "../exportMain.js";
import { CustomMethods } from "../exportMain.js";
import axios from "axios";

export default async () => {
    try {
        await (new REST({version: "10"}).setToken(process.env.TOKEN!))
            .put(Routes.applicationCommands(process.env.APPID!), {body: client.commands.filter(c => c.enabled).map(c => c.command.toJSON())});
    } catch (error) {
        console.log(error);
    }

    const parsedConfig: any = CustomMethods.parseJsonVariables(Config, {client: client});
    let intervalIndex: number = 0;
    function changeStatus() {
        client.user!.setPresence({
            status: parsedConfig.status[intervalIndex].status as PresenceStatusData,
            activities: [{
                name: parsedConfig.status[intervalIndex].name,
                type: parsedConfig.status[intervalIndex].type,
            }]
        });
        intervalIndex = parsedConfig.status.length - 1 == intervalIndex ? 0 : intervalIndex + 1;
    }

    changeStatus();
    setInterval(changeStatus, 3600000);

    const {remaining, total} = await axios.get("https://discord.com/api/v10/gateway/bot", {headers: {Authorization: `Bot ${process.env.TOKEN}`}}).then(d => d.data.session_start_limit);

    performance.mark("end-loading");

    console.clear();
    console.log(`|✅  ready!\n|⏰  started in: ${Math.round(performance.measure("loading", "start-loading", "end-loading").duration) / 1000} Seconds.\n|❤️ You have ${remaining} of ${total} login attempts left.`);

    performance.clearMarks();
    performance.clearMeasures();
}