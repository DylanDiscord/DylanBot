import fs from "node:fs";
import Sqlite3 from "sqlite3";

export namespace CustomMethods {
    // noinspection JSUnusedLocalSymbols
    export function parseJsonVariables(json: object, ref?: object): object {
        const jsonString: string = JSON.stringify(json);
        const matches: RegExpMatchArray | null = jsonString.match(/\$\{((?:.*?(?:\$?\{.*?})?.*?)*?)}/gm);
        if (matches == null) return json;
        for (const match of matches) {
            jsonString.replace(match, eval(match.substring(2, match.length - 1))).toString();
        }
        return JSON.parse(jsonString);
    }

    export async function sleep(time: number): Promise<void> {
        return await new Promise<void>((resolve) => setTimeout(() => resolve(), time));
    }

    export function getFilesRecursively(path: string): Array<string> {
        const files: Array<string> = [];
        for (const item of fs.readdirSync(path)) {
            if (fs.statSync(`${path}\\${item}`).isDirectory()) files.push(...getFilesRecursively(`${path}\\${item}`));
            else files.push(`${path}\\${item}`);
        }
        return files;
    }

    export async function fillDatabase(ref: {database: Sqlite3.Database}): Promise<void> {
        ref.database.all("CREATE TABLE IF NOT EXISTS UserLevels(userID TEXT, experience INTEGER, level INTEGER, unique(userID));");
    }

    export const randomColor = () => Math.floor(Math.random() * 0xffffff)
}