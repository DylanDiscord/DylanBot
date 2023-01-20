import { Request, Response } from "express";

export default abstract class BaseRoute {
    public abstract path: string | RegExp;

    public static notFound(res: Response): void {
        res.status(404).send({error: "Not Found", message: "Method doesn't exist or is invalid."});
    }

    public static badRequest(res: Response, message?: string): void {
        res.status(400).send({error: "Bad Request", message: message});
    }

    public getPath?: string | RegExp;
    public get(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public headPath?: string | RegExp;
    public head(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public postPath?: string | RegExp;
    public post(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public putPath?: string | RegExp;
    public put(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public deletePath?: string | RegExp;
    public delete(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public connectPath?: string | RegExp;
    public connect(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public optionsPath?: string | RegExp;
    public options(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public tracePath?: string | RegExp;
    public trace(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public patchPath?: string | RegExp;
    public patch(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }
}