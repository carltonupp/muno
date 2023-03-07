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
        for (const mapping of cfg.mappings) {
            this.mappings.set(mapping.path, mapping);
        }
    }

    resolve(method: HTTPMethod, url: string): RouteMapping | undefined {
        // find a mapping that matches the url
        const mapping = Array.from(this.mappings.keys())
            .filter((m) => {
                const pattern = new URLPattern({ pathname: m });
                return pattern.test(url);
            }).pop();

        if (!mapping) {
            return undefined;
        }

        const handler = this.mappings.get(mapping);

        // check the mappings supports the http method
        if (handler?.methods.includes(method)) {
            return handler;
        }

        return undefined;
    }
}
