import CustomClient from "./handlers/CustomClient.js";
import {Partials} from "discord.js";

export const client : CustomClient = new CustomClient("./test.db", {intents: 3276799, partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]});
