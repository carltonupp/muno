import { http } from '../src/deps.ts';
import { Router } from 'https://deno.land/x/muno@v0.1.0/router/router.ts';

const router = new Router();

router.get('/hello', (_req: Request) => {
    return new Response('Hello, World!');
});

router.get('/hello/:name', (req: Request) => {
    const pattern = new URLPattern({ pathname: '/hello/:name' });
    const match = pattern.exec(req.url);
    return new Response(
        `Hello, ${match?.pathname.groups.name}!`,
    );
});

await http.serve(router.handler());
