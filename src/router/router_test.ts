import { assertEquals, describe, it } from '../../test-deps.ts';
import { Router } from './router.ts';

describe('Router', () => {
    const router = new Router({
        mappings: [{
            path: '/users',
            methods: ['GET'],
            handler: (_req: Request) => {
                return new Response('hello, world');
            },
        }, {
            path: '/users/:id',
            methods: ['GET'],
            handler: (_req: Request) => {
                return new Response('hello, world');
            },
        }],
    });

    it('returns a handler with the correct method and path', () => {
        const handler = router.resolve(
            'GET',
            'https://example.com/users/123',
        );

        assertEquals(handler?.methods, ['GET']);
        assertEquals(handler?.path, '/users/:id');
    });

    it('returns undefined if a handler cannot be resolved', () => {
        const handler = router.resolve('POST', 'https://example.com/users/123');
        assertEquals(handler, undefined);
    });
});
