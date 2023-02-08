import {client, CommandBase, OCommandBuilder} from "../../exportMain.js";
import {SlashCommandBuilder, User} from "discord.js";

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
        await this.context.deferReply();

        client.mod_manager.currentCase.set(this.context.guild!.id, [this.context, null]);

        const objectiveUser: User = this.context.options.getUser("usuario")!;
        const reason: string = this.context.options.getString("razón")!;
        const notify: boolean = this.context.options.getBoolean("notificar") ?? false;

        if (!await client.mod_manager.doChecks(this.context, objectiveUser, "No puedes expulsar a un bot como caso de moderación, expulsalo de la manera tradicional.")) return;

        if (notify) await client.mod_manager.notify(this.context, objectiveUser, reason, "Te expulsaron | Kick");

        (await client.tryGetMember(this.context.guild!, objectiveUser.id))?.kick(reason);
    }
}