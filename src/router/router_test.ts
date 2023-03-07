import { assertEquals, assertThrows, describe, it } from '../../test-deps.ts';
import { Router } from './router.ts';

describe('Router', () => {
    const router = new Router();

    router.get('/users', (_req: Request) => {
        return new Response('hello, world');
    });

    router.get('/users/:id', (_req: Request) => {
        return new Response('hello, world');
    });

    describe('resolve', () => {
        it('returns a handler with the correct method and path', () => {
            const handler = router.resolve(
                'GET',
                'https://example.com/users/123',
            );

            assertEquals(handler?.methods, ['GET']);
            assertEquals(handler?.path, '/users/:id');
        });

        it('returns undefined if a handler cannot be resolved', () => {
            const handler = router.resolve(
                'POST',
                'https://example.com/users/123',
            );
            assertEquals(handler, undefined);
        });
    });

    describe('handle', () => {
        it('throws an error if path is empty', () => {
            assertThrows(() => {
                router.handle('', (_req: Request): Response => {
                    return new Response();
                }, 'GET');
            });
        });

        it('throws an error if methods is empty', () => {
            assertThrows(() => {
                router.handle('/users/:id', (_req: Request): Response => {
                    return new Response();
                });
            });
        });
    });
});
