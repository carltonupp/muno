import { http } from './deps.ts';

type Handler<TRequest, TResponse> = (req: TRequest) => TResponse;

export class Mu {
    static handle<TRequest, TResponse>(
        handlerFn: Handler<TRequest, TResponse>,
    ): http.Handler {
        return async (req: Request): Promise<Response> => {
            const body = (await req.json()) as TRequest;
            const output = handlerFn(body);
            return new Response(JSON.stringify(output), {
                status: 200,
                headers: {
                    'content-type': 'application/json',
                },
            });
        };
    }

    static async start(handler: http.Handler) {
        await http.serve(handler);
    }
}
