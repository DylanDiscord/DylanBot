import {client, CommandBase, Config, OCommandBuilder} from "../../exportMain.js";
import {EmbedBuilder, SlashCommandBuilder} from "discord.js";

export default class BotStats extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("bot")
        .setDescription("Grupo estadísticas bot")
        .addSubcommand(c => c
            .setName("stats")
            .setDescription("Obtén las estadísticas del bot desde la ultima vez que se inició"));

    async run(): Promise<void> {
        const seconds: number = client.uptime! / 1000, minutes: number = seconds / 60, hours: number = minutes / 60, days: number = hours / 24,
            fSeconds: number = Math.floor(seconds) % 60, fMinutes: number = Math.floor(minutes) % 60, fHours: number = Math.floor(hours) % 24, fDays: number = Math.floor(days),
            parsedString: string = `${fDays !== 0 ? `${fDays<10 ? "0"+fDays : fDays} dia${fDays === 1 ? "" : "s"},` : ""} ${fHours !== 0 ? `${fHours<10 ? "0"+fHours : fHours} hora${fHours === 1 ? "" : "s"},` : ""} ${fMinutes !== 0 ? `${fMinutes<10 ? "0"+fMinutes : fMinutes} minuto${fMinutes === 1 ? "" : "s"},` : ""} ${fSeconds<10 ? "0"+fSeconds : fSeconds} segundo${fSeconds === 1 ? "" : "s"}`

        let totalCommands: number = 0;
        for (const command of client.commands.values())
            totalCommands += command.use_count;

        const mostUsedCommand: CommandBase = client.commands.toJSON().sort((a, b) =>  b.use_count - a.use_count)[0];

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`👋 Hola Soy ${client.user!.username} 👋`)
            .setDescription(`\`🕐\` ┇ Estuve activo por los pasados \`${parsedString.trim()}\`.\n\n\`💖\` ┇ Estoy en un total de \`${client.guilds.cache.size}\` servidores con \`${client.users.cache.size}\` miembros.\n\n\`⚙️\` ┇ He ejecutado un total de \`${totalCommands}\` commandos\n\n\`🗣️\` ┇ Mi comando mas usado es \`${mostUsedCommand.command.name}${mostUsedCommand.command.options.map(o => ` ${o.toJSON().name} `).toString().trimEnd()}\` con \`${mostUsedCommand.use_count}\` ${mostUsedCommand.use_count == 1 ? "uso" : "usos"}.`)
            .setColor(Config.colors.defaultEmbed)
            .setImage("https://cdn.discordapp.com/attachments/1022949540921348156/1036390043704631347/standard_2.gif")
            .setTimestamp(Date.now())
            .setFooter({text: `Con amor ${Config.evalUsers.map(u => `${client.users.cache.get(u)!.username}, `).toString().slice(0, -2)}`});

        await this.context.reply({embeds: [embed]});
    }
}