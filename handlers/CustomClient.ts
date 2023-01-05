import {Client, ClientOptions, Collection} from "discord.js";
import ICommandBase from "./ICommandBase";

export default class CustomClient extends Client {
    commands: Collection<string, ICommandBase> = new Collection<string, ICommandBase>();

    constructor(options: ClientOptions) {
        super(options);
    }
}