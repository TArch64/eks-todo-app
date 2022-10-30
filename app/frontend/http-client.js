export class HttpClient {
    /**
    * @type {HttpClient}
    */
    static instance = null;

    static init(options) {
        this.instance = new HttpClient(options);
    }

    #options;

    constructor(options) {
        this.#options = options;
    }

    get(url, params) {
        return this.request('GET', url, { params });
    }

    post(url, body) {
        return this.request('POST', url, { body })
    }

    patch(url, body) {
        return this.request('PATCH', url, { body })
    }

    delete(url) {
        return this.request('DELETE', url);
    }

    async request(method, url, config = {}) {
        const response = await fetch(this.#buildUrl(url, config), {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: config.body ? JSON.stringify(config.body) : undefined
        });
        const responseBody = response.json().catch(() => null);

        if (!response.ok) {
            const error = new Error('Network Error');
            error.response = responseBody;
            throw error;
        }

        return responseBody;
    }

    #buildUrl(url, { params }) {
        const absoluteUrl = this.#options.baseUrl + url;
        if (!params) return absoluteUrl;
        const urlParams = new URLSearchParams(params);
        return `${absoluteUrl}?${urlParams}`;
    }
}