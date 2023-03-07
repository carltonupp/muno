import { assertThrows, describe, it } from '../test-deps.ts';
import { Router } from '../../src/router/router.ts';

describe('Router', () => {
    const router = new Router();

    router.get('/users', (_req: Request) => {
        return new Response('hello, world');
    });

    router.get('/users/:id', (_req: Request) => {
        return new Response('hello, world');
    });

    describe('route mapping', () => {
        it('throws an error if path is empty', () => {
            assertThrows(() => {
                router.mapRoute('', (_req: Request): Response => {
                    return new Response();
                }, 'GET');
            });
        });

        it('throws an error if methods is empty', () => {
            assertThrows(() => {
                router.mapRoute('/users/:id', (_req: Request): Response => {
                    return new Response();
                });
            });
        });
    });
});
