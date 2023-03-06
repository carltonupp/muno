import { http } from '../../deps.ts';

interface RouterConfig {
    mappings: RouteMapping[];
}

export type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface RouteMapping {
    path: string;
    methods: string[];
    handler: http.Handler;
}

export class Router {
    constructor(private cfg: RouterConfig) {}

    resolve(method: HTTPMethod, url: string): RouteMapping | undefined {
        return this.cfg.mappings
            .filter((m) => m.methods.includes(method))
            .filter((m) => {
                const pattern = new URLPattern({ pathname: m.path });
                return pattern.test(url);
            }).pop();
    }
}
