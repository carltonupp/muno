import { HttpRequest } from '../../src/router/routeHandler.ts';
import { assertEquals, describe, it } from '../test-deps.ts';

describe('Route Handler', () => {
    it('Can get property from query string', () => {
        const param = HttpRequest.getQueryParam(
            'https://example.com?name=carlton',
            'name',
        );

        assertEquals(param, 'carlton');
    });

    it('Can get path parameter from url', () => {
        const param = HttpRequest.getPathParam(
            '/users/:id',
            'https://example.com/users/12345',
            'id',
        );

        assertEquals(param, '12345');
    });
});
