import { http } from '../../deps.ts';

interface RouterConfig {
    mappings: RouteMapping[];
}

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
    constructor(cfg: RouterConfig) {
        cfg.mappings.forEach((mapping) => {
            this.mappings.set(mapping.path, mapping);
        });
    }

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
}
