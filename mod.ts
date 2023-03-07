import { http } from './deps.ts';
import { Router } from './src/router/router.ts';

interface MuConfiguration {
    port: number;
    router: Router;
}

export class Mu {
    constructor(private readonly config: MuConfiguration) {}

    async start() {
        await http.serve((request: Request): Response => {
            const route = this.config.router.resolve(
                request.method,
                request.url,
            );

            if (!route) {
                return new Response('', {
                    status: 404,
                });
            }

            return new Response();
        }, {
            port: this.config.port,
        });
    }
}
