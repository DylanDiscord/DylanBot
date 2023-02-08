import Sqlite3 from "sqlite3";

export default class CustomDb extends Sqlite3.Database {
    constructor(path: string, mode?: number, callback?: (err: (Error | null)) => void) {
        super(path, mode, callback);
    }

    public async allAsync<Tr = any, Tp = object>(query: string, params?: Tp): Promise<Array<Tr>> {
        return await new Promise<Array<Tr>>((resolve, reject) => {
            this.all(query, params == null ? {} : this.addDollarToKeys<Tp>(params), (error, data) => {
               if (error != null) reject(new Error(`${error}`));
               else resolve(data);
            });
        });
    }

    public async runAsync<Tp = object>(query: string, params?: Tp): Promise<void> {
        return await new Promise((resolve, reject) => {
           this.run(query, params == null ? {} : this.addDollarToKeys<Tp>(params), (error) => {
               if (error != null) reject(new Error(`${error}`));
               else resolve(undefined);
           });
        });
    }

    private addDollarToKeys<T = object>(params: T): T {
        Object.keys(params as object).forEach(e => {(params as any)[`\$${e}`] = (params as any)[e]; delete (params as any)[e]});
        return params;
    }
}