import {AuditLogEvent, CommandInteraction, EmbedBuilder, GuildAuditLogsEntry, GuildMember} from "discord.js";
import {client, Config} from "../exportMain.js";
import {CaseTypes} from "../handlers/ModManager.js";

export default async (member: GuildMember): Promise<void> => {
    const kickLog: GuildAuditLogsEntry | undefined = (await member.guild.fetchAuditLogs({limit: 1, type: AuditLogEvent.MemberKick})).entries.first();

    if (kickLog == null) return;

    const interaction: CommandInteraction | null = client.mod_manager.currentCase.get(member.guild.id)?.[0] ?? null;

    const caseNumber: number = await client.mod_manager.addCase(member.guild, {caseType: CaseTypes.KICK, userID: member.id, moderatorID: kickLog.executor!.id, reason: kickLog.reason ?? "No se definió una razón.", start: Date.now() / 1000});

    if (interaction != null) {
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`Caso: ${caseNumber} | Kick`)
            .setDescription(`**Usuario:** \`${member.user.tag}\`\n**Moderador:** \`${kickLog.executor!.tag}\`\n**Razón:** \`${kickLog.reason ?? "No se definió una razón."}\``)
            .setColor(Config.colors.defaultEmbed)
            .setTimestamp(Date.now());

        if (interaction.replied || interaction.deferred)
            await interaction.editReply({embeds: [embed]});
        else
            await interaction.reply({embeds: [embed]});

        client.mod_manager.currentCase.delete(member.guild.id);
    }
}