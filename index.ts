import { Partials } from 'discord.js';
import CustomClient from "./handlers/CustomClient.js";
import fs from 'node:fs';
(await import("dotenv")).config({path: "./config/.env"});

const client : CustomClient = new CustomClient({intents: 3276799, partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]});

for (const event of fs.readdirSync("./events").filter(e => e.endsWith(".ts"))) {
    client.on(event.substring(0, event.length - 3), async (...args: any) => (await import(`./events/${event}`)).default(client, ...args));
}

for (const commandIteration of fs.readdirSync("./commands").filter(e => e.endsWith(".ts"))) {
    // noinspection JSPotentiallyInvalidConstructorUsage
    const command = new (await import(`./commands/${commandIteration}`)).default();
    client.commands.set(command.command.name, command);
}

await client.login(process.env.TOKEN);