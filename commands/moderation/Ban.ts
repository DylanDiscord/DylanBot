import {client, CommandBase, CustomMethods, OCommandBuilder} from "../../exportMain.js";
import {SlashCommandBuilder, User} from "discord.js";

export default class Ban extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Quitar el acceso al servidor a un usuario.")
        .addUserOption(o => o.setName("usuario").setDescription("Usuario al que expulsar").setRequired(true))
        .addStringOption(o => o.setName("razón").setDescription("Por que vas a expulsar al usuario en question?").setRequired(true))
        .addStringOption(o => o.setName("tiempo").setDescription("Por cuanto tiempo vas a quitar acceso al usuario en question?"))
        .addBooleanOption(o => o.setName("notificar").setDescription("Mandar un dm sobre la expulsion al usuario?"));

    public async run(): Promise<void> {
        await this.context.deferReply();

        const objectiveUser: User = this.context.options.getUser("usuario")!;
        const reason: string = this.context.options.getString("razón")!;
        const notify: boolean = this.context.options.getBoolean("notificar") ?? false;
        const time: number | null = CustomMethods.parseDurationToSeconds(this.context.options.getString("tiempo") ?? "");

        client.mod_manager.currentCase.set(this.context.guild!.id, [this.context, {time: time}]);

        if (!await client.mod_manager.doChecks(this.context, objectiveUser, "No puedes expulsar a un bot como caso de moderación, expulsalo de la manera tradicional.")) return;

        if (notify) await client.mod_manager.notify(this.context, objectiveUser, reason, "Fuiste prohibido | Ban");

        (await client.tryGetMember(this.context.guild!, objectiveUser.id))?.ban({reason: reason});
    }
}