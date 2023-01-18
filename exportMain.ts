import config from "./config/config.json" assert {type: "json"};
import CustomClient from "./handlers/CustomClient.js";
import {Partials, PermissionsBitField, PermissionFlagsBits} from "discord.js";

export const PermissionFlags: typeof PermissionFlagsBits = PermissionsBitField.Flags;
export const client : CustomClient = new CustomClient(config.paths.databases, {intents: 3276799, partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]});
export { CustomMethods } from "./handlers/CustomMethods.js";
export { CommandBase, OCommandBuilder } from "./handlers/CommandBase.js";
export { default as CustomClient } from "./handlers/CustomClient.js";
export { default as Config } from "./config/config.json" assert {type: "json"};
export { default as ModManager, ICase } from "./handlers/ModManager.js";
export { default as CustomDb } from "./handlers/CustomDb.js";
