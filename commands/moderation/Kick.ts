import {client, CommandBase, Config, OCommandBuilder} from "../../exportMain.js";
import {EmbedBuilder, SlashCommandBuilder, User} from "discord.js";
import {CaseTypes} from "../../handlers/ModManager";

export default class Kick extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Expulsar a un usuario.")
        .addUserOption(o => o.setName("usuario").setDescription("Usuario al que expulsar").setRequired(true))
        .addStringOption(o => o.setName("razón").setDescription("Por que vas a expulsar al usuario en question?").setRequired(true))
        .addBooleanOption(o => o.setName("notificar").setDescription("Mandar un dm sobre la expulsion al usuario?"))
        .setDMPermission(false);

    override enabled = false;

    public async run(): Promise<void> {
        await this.context.deferReply()

        const objectiveUser: User = this.context.options.getUser("usuario")!;
        const reason: string = this.context.options.getString("razón")!;
        const notify: boolean = this.context.options.getBoolean("notificar") ?? false;

        if (!await client.mod_manager.isModerator(this.context.guild!, this.context.user)) {
            await this.context.deleteReply();
            return;
        }

        if (objectiveUser.bot) {
            const botEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle("El usuario es un bot.")
                .setDescription("No puedes expulsar a un bot como caso de moderación, expulsalo de la manera tradicional.")
                .setColor(Config.colors.errorEmbed);

            await this.context.editReply({embeds: [botEmbed]});
            return;
        }

        const caseNumber: number = await client.mod_manager.addCase(this.context.guild!, {$caseType: CaseTypes.KICK, $userID: objectiveUser.id, $moderatorID: this.context.user.id, $reason: reason, $start: Math.round(Date.now() / 1000)})

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`Caso: ${caseNumber} | Kick`)
            .setDescription(`**Usuario:** \`${objectiveUser.tag}\`\n**Moderador:** \`${this.context.user.tag}\`\n**Razón:** \`${reason}\``)
            .setColor(Config.colors.defaultEmbed)
            .setTimestamp(Date.now());

        if (notify) {
            const notifyEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle("Te expulsaron | Kick")
                .setDescription(`**Moderador:** \`${this.context.user.tag}\`\n**Servidor:** \`${this.context.guild!.name}\`\n**Razón:** \`${reason}\``)
                .setColor(Config.colors.defaultEmbed)
                .setTimestamp(Date.now());

            try  {
                await objectiveUser.send({embeds: [notifyEmbed]});
            } catch {
                embed.setFooter({text: "No se pudo enviar la notificación"});
            }
        }

        await this.context.editReply({embeds: [embed]});
    }

}