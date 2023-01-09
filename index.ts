import fs from 'node:fs';
import { CustomMethods } from "./handlers/CustomMethods.js";
import { CommandBase } from "./handlers/CommandBase.js";
import { client } from "./exportMain.js";
(await import("dotenv")).config({path: "./config/.env"});

for (const event of fs.readdirSync("./events").filter(e => e.endsWith(".ts"))) {
    client.on(event.substring(0, event.length - 3), async (...args: any) => (await import(`./events/${event}`)).default(client, ...args));
}

for (const commandIteration of CustomMethods.getFilesRecursively("./commands").filter(e => e.endsWith(".ts"))) {
    //noinspection JSPotentiallyInvalidConstructorUsage
    const command: CommandBase = new (await import(commandIteration.replace(/\.ts/gmi, ".js"))).default();
    client.commands.set(command.command.name, command);
}

await client.login(process.env.TOKEN);