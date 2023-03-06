import { assertEquals, describe, it } from '../../test-deps.ts';
import { Router } from './router.ts';

describe('Router', () => {
    const router = new Router({
        mappings: [{
            path: '/users',
            methods: ['get'],
            handler: (_req) => {
                return new Response('hello, world');
            },
        }, {
            path: '/users/:id',
            methods: ['get'],
            handler: (_req) => {
                return new Response('hello, world');
            },
        }],
    });

    it('returns a handler with the correct method and path', () => {
        const handler = router.resolve(
            'get',
            'https://example.com/users/123',
        );

        assertEquals(handler?.methods, ['get']);
        assertEquals(handler?.path, '/users/:id');
    });

    it('returns undefined if a handler cannot be resolved', () => {
        const handler = router.resolve('post', 'https://example.com/users/123');
        assertEquals(handler, undefined);
    });
});
