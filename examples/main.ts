import { http } from '../src/deps.ts';
import { Router } from 'https://deno.land/x/muno@v0.1.0/router/router.ts';

const router = new Router();

router.get('/', (_req: Request) => {
    return new Response('Hello, World!');
});

http.serve(router.handler());
