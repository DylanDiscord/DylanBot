import fs from "node:fs";
import { client } from "../exportMain.js";

export namespace CustomMethods {
    export function parseJsonVariables(json: object): object {
        const jsonString: string = JSON.stringify(json);
        const matches: RegExpMatchArray | null = jsonString.match(/\$\{.*}/gm);
        if (matches == null) return json;
        console.log(matches)
        // for (const match of matches) {
        //     console.log(`${match}\n`);
        //     //jsonString.replace(match, eval(match.substring(1, match.length - 1)));
        // }
        return JSON.parse(jsonString);
    }

    export async function sleep(time: number): Promise<void> {
        return await new Promise<void>((resolve) => setTimeout(() => resolve(), time))
    }

    export function getFilesRecursively(path: string): Array<string> {
        const files: Array<string> = [];
        for (const item of fs.readdirSync(path)) {
            if (fs.statSync(`${path}\\${item}`).isDirectory()) files.push(...getFilesRecursively(`${path}\\${item}`));
            else files.push(`${path}\\${item}`);
        }
        return files;
    }

    export async function dbRun(command: string, params: object): Promise<any> {
        return await new Promise<any>((resolve, reject) => {
            client.database.all(command, params, (error: Error | null, result: any[]) => {
                if (error != null) reject(error);
                else resolve(result);
            });
        });
    }
}