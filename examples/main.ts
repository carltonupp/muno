import { http } from '../src/deps.ts';
import { Router } from '../src/router/router.ts';

const router = new Router();

router.get('/?name', (_req: Request) => {
    return new Response('Hello, World!');
});

http.serve(router.handler());
