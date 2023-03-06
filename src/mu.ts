import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

export class Mu {
    static async start() {
        const handler = (): Response => {
            return new Response(
                JSON.stringify({ message: "Hello from Mu!"}),
                {
                    status: 200,
                    headers: { "content-type": "application/json"}
                }
            );
        }

        await serve(handler);
    }
}