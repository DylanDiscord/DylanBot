import fs from "node:fs";
import Sqlite3 from "sqlite3";

export namespace CustomMethods {
    /**
    * @todo not finished yet.
    */
    export function parseJsonVariables(json: object): object {
        return json;
        const jsonString: string = JSON.stringify(json);
        const matches: RegExpMatchArray | null = jsonString.match(/\$\{.*}/gm);
        if (matches == null) return json;
        console.log(matches);
        // for (const match of matches) {
        //     console.log(`${match}\n`);
        //     //jsonString.replace(match, eval(match.substring(1, match.length - 1)));
        // }
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
}