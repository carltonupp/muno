import { Mu } from "../src/mu.ts";

interface Example {
    message: string;
}

interface RespMessage {
    messageBack: string;
}

const handler = Mu.handle((req: Example) : RespMessage => {
    return {
        messageBack: req.message
    }
})

await Mu.start(handler);