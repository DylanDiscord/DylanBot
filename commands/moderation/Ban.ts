import {CommandBase, OCommandBuilder} from "../../exportMain.js";
import {SlashCommandBuilder} from "discord.js";

export default class Ban extends CommandBase {
    command: OCommandBuilder = new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Quitar el acceso al servidor a un usuario.")
        .addUserOption(o => o.setName("usuario").setDescription("Usuario al que expulsar").setRequired(true))
        .addStringOption(o => o.setName("tiempo").setDescription("Por cuanto tiempo vas a quitar acceso al usuario en question?").setRequired(true))
        .addStringOption(o => o.setName("razón").setDescription("Por que vas a expulsar al usuario en question?").setRequired(true))
        .addBooleanOption(o => o.setName("notificar").setDescription("Mandar un dm sobre la expulsion al usuario?"));

    public async run(): Promise<void> {

    }
}