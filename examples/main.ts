import { Mu } from '../src/mu.ts';

interface Example {
    message: string;
}

interface RespMessage {
    messageBack: string;
}

const getMessageBack = (req: Example): RespMessage => {
    return {
        messageBack: req.message,
    };
};

const handler = Mu.handle(getMessageBack);

await Mu.start(handler);
