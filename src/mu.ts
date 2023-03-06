import { serve } from "./deps.ts";

type Handler<TRequest, TResponse> = (req: TRequest) => TResponse

export class Mu {
    static handle<TRequest, TResponse>(h: Handler<TRequest, TResponse>) : (req: Request) => Promise<Response> {
        return async (req: Request): Promise<Response> => {
            const body = await req.json()as TRequest
            const output = h(body);
            return new Response(
                JSON.stringify(output),
                {
                    headers: {
                        "content-type": "application/json"
                    }
                }
            );
        }
    }

    static async start(handler: (req: Request) => Promise<Response>) {
        await serve(handler);
    }
}