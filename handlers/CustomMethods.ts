import fs from "node:fs";
import Sqlite3 from "sqlite3";
import * as process from "process";
import axios from "axios";

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
        ref.database.all("CREATE TABLE IF NOT EXISTS UserCases(caseID INTEGER PRIMARY KEY AUTOINCREMENT, userID TEXT, moderatorID TEXT, reason TEXT, caseType INTEGER, start INTEGER, end INTEGER, unique(caseID))");
    }

    export const randomColor = () => Math.floor(Math.random() * 16777215)

    export async function getGifsFromTenor(ref: {query: string, locale?: LanguageCodes, limit?: number}): Promise<Array<string>> {
        const gifs: ITenorResponse = await axios.get<ITenorResponse>(`https://tenor.googleapis.com/v2/search?key=${process.env.TENORKEY}&q=${ref.query}&locale=${ref.locale ?? LanguageCodes.English}&contentfilter=medium&media_filter=gif&limit=${ref.limit ?? 1}&random=true`).then(r => r.data);
        const results: Array<string> = [];
        for (const result of gifs.results) results.push(result.media_formats.gif.url);
        return results;
    }

    export async function getDataFromDb<T>(ref: {db: Sqlite3.Database, command: string, params?: object}): Promise<Array<T>> {
        return await new Promise<Array<T>>((resolve, reject) => {
            function callback (error: Error | null, data: any[]) {
                if (error != null) {
                    reject(error);
                    return;
                }
                resolve(data as Array<T>);
            }
            if (ref.params != null) ref.db.all(ref.command, ref.params, callback);
            else ref.db.all(ref.command, callback);
        });
    }
}

export interface ITenorResponse {
    next: string,
    results: Array<ITenorGifObject>
}

export interface ITenorGifObject {
    created: number,
    hasaudio: boolean,
    hascaption: boolean,
    id: string,
    itemurl: string
    media_formats: any,
    tags: Array<string>,
    title: string,
    url: string
    content_description: string,
    flags: string,
    bg_color: string
}

export enum LanguageCodes {
    English = "en",
    Chinese = "zh",
    Spanish = "es",
    Arabic = "ar",
    Bengali = "bn",
    Portuguese = "pt",
    Russian = "ru",
    French = "fr",
    German = "de",
    Hindi = "hi"
}