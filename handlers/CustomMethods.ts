
export namespace CustomMethods {
    export async function returnPromiseResult<T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T> {
        return new Promise<T>((resolve, reject) => executor(resolve, reject));
    }

    export function parseJsonVariables(json: object): object {
        const jsonString: string = JSON.stringify(json);
        const matches: RegExpMatchArray | null = jsonString.match(/{.+}/gm);
        if (matches == null) return json;
        for (const match of matches) jsonString.replace(match, eval(match.substring(1, match.length - 1)));
        return JSON.parse(jsonString);
    }
}