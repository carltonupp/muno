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

const createRoute = (
    method: HTTPMethod,
    route: string,
    handler: RequestHandler,
): RouteMapping => {
    return {
        method,
        route,
        handler,
    };
};

let idx = createRoute('GET', '/', (req) => Response.json(req.headers));
