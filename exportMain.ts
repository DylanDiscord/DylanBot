import config from "./config/config.json" assert {type: "json"};
import CustomClient from "./handlers/CustomClient.js";
import {Partials} from "discord.js";

export const client : CustomClient = new CustomClient(config.paths.databases, {intents: 3276799, partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]});
