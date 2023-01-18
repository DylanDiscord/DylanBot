import Sqlite3 from "sqlite3";

export default class CustomDb extends Sqlite3.Database {
    constructor(path: string, mode?: number, callback?: (err: (Error | null)) => void) {
        super(path, mode, callback);
    }

    public async allAsync<Tr = any, Tp = object>(query: string, params?: Tp): Promise<Array<Tr>> {
        return await new Promise<Array<Tr>>((resolve, reject) => {
            this.all(query, params, (error, data) => {
               if (error != null) reject(error);
               else resolve(data);
            });
        });
    }

    public async runAsync<Tp = object>(query: string, params?: Tp): Promise<void> {
        return await new Promise((resolve, reject) => {
           this.run(query, params, (error) => {
               if (error != null) reject(error);
               else resolve(undefined);
           });
        });
    }
}