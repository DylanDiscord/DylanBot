import { client } from "../exportMain.js";

export default function registerApiEvents() {
    client.api.get("/status", async (req, res, next) => {
        try {
            let commandCount: number = 0;
            for (const command of client.commands.values()) commandCount += command.use_count;

            await res.send({
                uptime: client.uptime,
                command_uses: commandCount,
                total_guilds: client.guilds.cache.size,
                total_members: client.guilds.cache.size
            });
        } catch (err) {
            next(err)
        }
    });

    client.api.use(async (err) => {
        if (err != null) {
            await err.res?.send
        }
    })
}