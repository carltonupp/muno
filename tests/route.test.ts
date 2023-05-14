import { assertEquals } from './test-deps.ts';
import { createRoute, createRouterFromRoutes } from '../src/mod.ts';

Deno.test('can create route', async () => {
    const route = createRoute(
        'GET',
        '/test',
        () => Response.json({ message: 'test passed' }),
    );

    assertEquals(route.method, 'GET');
    assertEquals(route.route, '/test');
    const req = new Request('http://example.com/test');
    const res = await route.handler(req);
    assertEquals(await res.json(), { message: 'test passed' });
});

Deno.test('router can resolve handler for correct path', async () => {
    const router = createRouterFromRoutes(
        createRoute(
            'GET',
            '/',
            () => Response.json({ message: 'welcome to the index page!' }),
        ),
        createRoute(
            'GET',
            '/robots.txt',
            () => Response.json({ message: 'view this sites robots.txt file' }),
        ),
    );

    const req = new Request('http://example.com/');
    const route = router.resolve(req);
    const res = await route?.handler(req);
    assertEquals(await res?.json(), { message: 'welcome to the index page!' });
});

Deno.test('router can resolve handler for correct method', async () => {
    const router = createRouterFromRoutes(
        createRoute(
            'GET',
            '/',
            () => Response.json({ message: 'welcome to the index page!' }),
        ),
        createRoute(
            'POST',
            '/',
            () => Response.json({ message: 'submit form data' }),
        ),
    );

    const req = new Request('http://example.com/', {
        method: 'POST',
    });
    const route = router.resolve(req);
    const res = await route?.handler(req);
    assertEquals(await res?.json(), { message: 'submit form data' });
});

Deno.test('router returns a 404 if no matching route is found', async () => {
    const router = createRouterFromRoutes(
        createRoute(
            'GET',
            '/',
            () => Response.json({ message: 'welcome to the index page!' }),
        ),
        createRoute(
            'POST',
            '/',
            () => Response.json({ message: 'submit form data' }),
        ),
    );

    const req = new Request('http://example.com/not-found', {
        method: 'POST',
    });

    const route = router.resolve(req);
    const res = await route?.handler(req);
    assertEquals(res?.status, 404);
});
