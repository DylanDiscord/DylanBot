import {client, CommandBase, Config, OCommandBuilder, PermissionFlags} from "../../exportMain.js";
import {Role, SlashCommandBuilder, APIRole, EmbedBuilder} from "discord.js";

export default class ManageModerators extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("moderadores")
        .setDescription("Añadir o quitar moderadores")
        .addSubcommand(s => s
            .setName("agregar")
            .setDescription("Añadir un rol como moderador")
            .addRoleOption(o => o
                .setName("rol")
                .setDescription("Rol que añadir como moderador")
                .setRequired(true)))
        .addSubcommand(s => s
            .setName("quitar")
            .setDescription("Quitar un rol como moderador")
            .addRoleOption(o => o
                .setName("rol")
                .setDescription("Rol que quitar como moderador")
                .setRequired(true)))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlags.Administrator);

    async run(): Promise<void> {
        const role: Role | APIRole = this.context.options.getRole("rol")!;
        const subCommand: string = this.context.options.getSubcommand();

        if (!await (subCommand == "agregar" ? client.mod_manager.addModerator : client.mod_manager.removeModerator)(this.context.guild!, role as Role)) {
            const errorEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(subCommand == "agregar" ? `El rol \`${role.name}\` ya esta en la lista de moderadores` : `El rol \`${role.name}\` no esta en la lista de moderadores`)
                .setColor(Config.colors.errorEmbed);

            await this.context.reply({embeds: [errorEmbed], ephemeral: true});
            return;
        }

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(subCommand == "agregar" ? "Rol añadido" : "Rol quitado")
            .setDescription(`Rol \`${role.name}\` ${subCommand == "agregar" ? "añadido" : "quitado"} como moderador de este servidor\n**ID Rol:** \`${role.id}\`\n**ID Servidor:** \`${this.context.guild!.id}\``)
            .setColor(Config.colors.successEmbed)
            .setTimestamp(Date.now());

        await this.context.reply({embeds: [embed], ephemeral: true});
    }
}