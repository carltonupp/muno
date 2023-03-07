import { http } from '../../deps.ts';

type HTTPMethod =
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';

interface RouteMapping {
    path: string;
    methods: string[];
    handler: http.Handler;
}

export class Router {
    private mappings = new Map<string, RouteMapping>();

    resolve(method: HTTPMethod, url: string): RouteMapping | undefined {
        for (const [path, mapping] of this.mappings) {
            const pattern = new URLPattern({ pathname: path });
            if (pattern.test(url)) {
                if (mapping.methods.includes(method)) {
                    return mapping;
                }
            }
        }
    }

    handle(path: string, methods: HTTPMethod[], handler: http.Handler) {
        if (!path) {
            throw new Error('Path is required');
        }

        if (!methods.length) {
            throw new Error('Must provide at least one method');
        }

        this.mappings.set(path, {
            path,
            methods,
            handler,
        });
    }

    get(path: string, handler: http.Handler) {
        this.handle(path, ['GET'], handler);
    }

    post(path: string, handler: http.Handler) {
        this.handle(path, ['POST'], handler);
    }

    put(path: string, handler: http.Handler) {
        this.handle(path, ['PUT'], handler);
    }

    patch(path: string, handler: http.Handler) {
        this.handle(path, ['PATCH'], handler);
    }

    delete(path: string, handler: http.Handler) {
        this.handle(path, ['DELETE'], handler);
    }
}
