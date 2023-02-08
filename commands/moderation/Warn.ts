import {client, CommandBase, Config, OCommandBuilder} from "../../exportMain.js";
import {SlashCommandBuilder, EmbedBuilder, User} from "discord.js";
import {CaseTypes} from "../../handlers/ModManager.js";

export default class Warn extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Avisar a un usuario de una accion en contra de la normativa.")
        .addUserOption(o => o.setName("usuario").setDescription("Usuario al que hacer un warn o aviso").setRequired(true))
        .addStringOption(o => o.setName("razón").setDescription("Por que vas a hacer un warn o aviso al usuario en question?").setRequired(true))
        .addBooleanOption(o => o.setName("notificar").setDescription("Mandar un dm sobre el aviso o warn al usuario?"))
        .setDMPermission(false);

    public async run(): Promise<void> {
        await this.context.deferReply();

        const objectiveUser: User = this.context.options.getUser("usuario")!;
        const reason: string = this.context.options.getString("razón")!;
        const notify: boolean = this.context.options.getBoolean("notificar") ?? false;

        if (!await client.mod_manager.doChecks(this.context, objectiveUser, "No puedes hacer warn a un bot.")) return;

        const caseNumber: number = await client.mod_manager.addCase(this.context.guild!, {caseType: CaseTypes.WARN, userID: objectiveUser.id, moderatorID: this.context.user.id, reason: reason, start: Math.round(Date.now() / 1000)})

        if (notify) await client.mod_manager.notify(this.context, objectiveUser, reason, "Obtuviste un aviso | Warn");

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`Caso: ${caseNumber} | Warn`)
            .setDescription(`**Usuario:** \`${objectiveUser.tag}\`\n**Moderador:** \`${this.context.user.tag}\`\n**Razón:** \`${reason}\``)
            .setColor(Config.colors.defaultEmbed)
            .setTimestamp(Date.now());

        await this.context.editReply({embeds: [embed]});
    }
}