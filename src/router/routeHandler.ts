export class HttpRequest {
    private constructor(private readonly req: Request) {}

    static from(req: Request) {
        return new HttpRequest(req);
    }

    static getPathParam(
        route: string,
        url: string,
        key: string,
    ): string | number | undefined {
        const pattern = new URLPattern({ pathname: route });
        const match = pattern.exec(url);
        return match?.pathname.groups[key];
    }

    static getQueryParam(url: string, key: string): string | null {
        return new URL(url)
            .searchParams.get(key);
    }

    async getBody<TRequestBody>() {
        return await this.req.json() as TRequestBody;
    }
}
