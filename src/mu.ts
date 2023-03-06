import { serve } from './deps.ts';

type Handler<TRequest, TResponse> = (req: TRequest) => TResponse;
type HttpHandler = (req: Request) => Response;
type AsyncHttpHandler = (req: Request) => Promise<Response>;

export class Mu {
    static handle<TRequest, TResponse>(
        handlerFn: Handler<TRequest, TResponse>,
    ): HttpHandler | AsyncHttpHandler {
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

    static async start(handler: HttpHandler | AsyncHttpHandler) {
        await serve(handler);
    }
}
