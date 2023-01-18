import {client, CommandBase, ICase, OCommandBuilder, Config} from "../../exportMain.js";
import {
    ButtonBuilder,
    EmbedBuilder,
    EmbedField,
    SlashCommandBuilder,
    User,
    ButtonStyle,
    ComponentType,
    ActionRowBuilder,
    ButtonInteraction,
    Message,
    InteractionCollector,
    PermissionsBitField
} from "discord.js";

export default class ViewCases extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("casos")
        .setDescription("Comandos relacionados con casos de moderación")
        .addSubcommand(c => c
            .setName("ver")
            .setDescription("Ver los casos en este servidor")
            .addStringOption(o => o.setName("orden").setDescription("En que orden ver los casos?").addChoices({name: "Ascendiente", value: "asc"}, {name: "Descendiente", value: "desc"}))
            .addUserOption(o => o.setName("usuario").setDescription("Filtrar por usuario?")))
        .setDMPermission(false);

    async run(): Promise<void> {
        await this.context.deferReply();

        const order: string = this.context.options.getString("orden") ?? "desc";
        const user: User | null = this.context.options.getUser("usuario");

        if (!await client.mod_manager.isModerator(this.context.guild!, this.context.user)) {
            await this.context.deleteReply();
            return;
        }

        const cases: Array<ICase> = await client.mod_manager.getCases(this.context.guild!, {order: order as "asc" | "desc", user: user});

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(user != null ? `Casos de ${user.tag}` : "Todos los casos")
            .setDescription("Tu búsqueda no retorno ningun caso.")
            .setColor(Config.colors.errorEmbed)
            .setTimestamp(Date.now())

        if (cases == null || cases.length < 1) {
            await this.context.editReply({embeds: [embed]});
            return;
        }

        const fields: Array<EmbedField> = await Promise.all<EmbedField>(
            cases.map(async c => ({
                name: `Caso: ${c.$caseID}`,
                value: `**TAG del usuario:** \`${(await client.users.fetch(c.$userID)).tag}\`\n**ID del usuario:** \`${c.$userID}\`\n**TAG del moderador:** \`${(await client.users.fetch(c.$moderatorID)).tag}\`\n**ID del moderador:** \`${c.$userID}\`\n**Razón:** \`${c.$reason}\``,
                inline: false
            }))
        );

        function getEmbedPage(i: number): EmbedBuilder {
            const current = fields.slice(i, i + 5);
            return embed
                .setDescription(`**Esta búsqueda contiene:** \`${cases.length} casos\``)
                .setFields(current)
                .setFooter({text: `Mostrando ${i + 1} - ${i + current.length} de ${cases.length}`})
                .setColor(Config.colors.defaultEmbed);
        }

        let index: number = 0;

        const rightButton: ButtonBuilder = new ButtonBuilder()
            .setLabel("Derecha")
            .setCustomId("Right")
            .setEmoji('➡️')
            .setStyle(ButtonStyle.Primary);

        const leftButton: ButtonBuilder = new ButtonBuilder()
            .setLabel("Izquierda")
            .setCustomId("Left")
            .setEmoji('⬅️')
            .setStyle(ButtonStyle.Primary);

        const message: Message = await this.context.editReply({embeds: [getEmbedPage(index)], components: [...(cases.length <= 5 ? [] : [new ActionRowBuilder<ButtonBuilder>().setComponents(rightButton)])]});

        if (cases.length <= 5) return;

        const collector: InteractionCollector<ButtonInteraction> = message.createMessageComponentCollector({componentType: ComponentType.Button, time: 870000});

        collector.on('collect', async interaction => {
            interaction.customId == "Right" ? index += 5 : index -= 5;
            await interaction.update({embeds: [getEmbedPage(index)], components: [new ActionRowBuilder<ButtonBuilder>().addComponents(...(index ? [leftButton] : []), ...(index + 5 < cases.length ? [rightButton] : []))]});
        });

        collector.on('end', async interaction => {
            const fi: ButtonInteraction | undefined = interaction.first();
            if (fi != undefined)
                await fi.update({embeds: [getEmbedPage(index)], components: [new ActionRowBuilder<ButtonBuilder>().addComponents(...(index ? [leftButton.setDisabled(true)] : []), ...(index + 5 < cases.length ? [rightButton.setDisabled(true)] : []))]});
        });
    }
}