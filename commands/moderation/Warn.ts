import {client, CommandBase, Config, OCommandBuilder} from "../../exportMain.js";
import {SlashCommandBuilder, User, PermissionsBitField, EmbedBuilder} from "discord.js";
import {CaseTypes} from "../../handlers/ModManager.js";

export default class Warn extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Hacer un warn o aviso a un usuario")
        .addUserOption(o => o.setName("usuario").setDescription("Usuario al que hacer un warn o aviso").setRequired(true))
        .addStringOption(o => o.setName("razón").setDescription("Por que vas a hacer un warn o aviso al usuario en question?").setRequired(true))
        .addBooleanOption(o => o.setName("notificar").setDescription("Mandar un dm sobre el aviso o warn al usuario?"))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages);

    async run(): Promise<void> {
        await this.context.deferReply();

        const objective: User = this.context.options.getUser("usuario")!;
        const reason: string = this.context.options.getString("razón")!;
        const notify: boolean = this.context.options.getBoolean("notificar") ?? false;

        const caseNumber: number = await client.mod_manager.addCase(this.context.guild!.id, {$caseType: CaseTypes.WARN, $userID: objective.id, $moderatorID: this.context.user.id, $reason: reason, $start: Date.now() / 1000})

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`Caso: ${caseNumber} | Warn`)
            .setDescription(`**Usuario:** \`${objective.tag}\`\n**Moderador:** \`${this.context.user.tag}\`\n**Razón:** \`${reason}\``)
            .setColor(Config.colors.defaultEmbed)
            .setTimestamp(Date.now());

        if (notify) {
            const notifyEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle("Obtuviste un aviso | warn")
                .setDescription(`**Moderador:** \`${this.context.user.tag}\`\n**Razón:** \`${reason}\``)
                .setColor(Config.colors.defaultEmbed)
                .setTimestamp(Date.now());

            try  {
                await objective.send({embeds: [notifyEmbed]});
            } catch {
                embed.setFooter({text: "No se pudo enviar la notificación"})
            }
        }

        await this.context.editReply({embeds: [embed]});
    }
}