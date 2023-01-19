import { Request, Response } from "express";

export default abstract class BaseRoute {
    public abstract path: string | RegExp;

    public static notFound(res: Response): void {
        res.statusCode = 404;
        res.json({error: "Method doesn't exist."});
    }

    public static methodNotAllowed(res: Response): void {
        res.statusCode = 405;
        res.json({error: "Method not allowed."});
    }

    public static badRequest(res: Response, message?: string): void {
        res.statusCode = 400;
        res.json({error: "Bad Request", message: message});
    }

    public get(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public head(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public post(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public put(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public delete(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public connect(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public options(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public trace(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }

    public patch(req: Request, res: Response): void {
        BaseRoute.notFound(res);
    }
}