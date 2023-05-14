export type HTTPMethod =
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'PATCH';

type RequestHandler = (req: Request) => Response | Promise<Response>;

type RouteMapping = {
    method: HTTPMethod | HTTPMethod[];
    route: string;
    handler: RequestHandler;
};

export function createRoute(
    method: HTTPMethod,
    route: string,
    handler: RequestHandler,
): RouteMapping {
    return {
        method,
        route,
        handler,
    };
}

class Router {
    private readonly _routes: RouteMapping[];
    constructor(routes: RouteMapping[]) {
        this._routes = routes;
    }

    resolve(req: Request): RouteMapping {
        const path = new URL(req.url).pathname;
        return this._routes.find((r) =>
            r.route === path && r.method === req.method
        ) || createRoute(
            req.method as HTTPMethod,
            req.url,
            () =>
                Response.json({}, {
                    status: 404,
                }),
        );
    }
}

export function createRouterFromRoutes(...routes: RouteMapping[]): Router {
    return new Router(routes);
}
