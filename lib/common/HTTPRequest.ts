export default class HTTPRequest {
    private static asyncRequest(type: string, url: string, body: FormData|Blob = null): Promise<string> {
        const getRequest = new XMLHttpRequest();
        getRequest.open(type, url);

        return new Promise<string>((resolve, reject) => {
            getRequest.onload = (ev: ProgressEvent) => {
                if (getRequest.status === 200) {
                    resolve(getRequest.responseText);
                } else {
                    reject(getRequest.statusText);
                }
            };

            getRequest.onerror = () => {
                reject(getRequest.statusText);
            };

            getRequest.send(body);
        });
    }

    public static getAsync(url: string): Promise<string> {
        return this.asyncRequest("GET", url);
    }

    public static postAsync(url: string, formData: FormData): Promise<string> {
        return this.asyncRequest("POST", url, formData);
    }

    public static deleteAsync(url: string): Promise<string> {
        return this.asyncRequest("DELETE", url);
    }

    public static patchAsync(url: string, formData: FormData): Promise<string> {
        return this.asyncRequest("PATCH", url, formData);
    }

    public static downloadAsync(url: string): Promise<Blob> {
        const getRequest = new XMLHttpRequest();
        getRequest.open("GET", url);

        return new Promise<Blob>((resolve, reject) => {
            getRequest.onload = (ev: ProgressEvent) => {
                if (getRequest.status === 200) {
                    // The Blob constructor takes an array of ArrayBuffers, ArrayBufferViews, Blobs, DOMStrings,
                    // or a combination of those.
                    const blob = new Blob([getRequest.response]);

                    resolve(blob);
                } else {
                    reject(getRequest.statusText);
                }
            };

            getRequest.onerror = () => {
                reject(getRequest.statusText);
            };

            getRequest.send();
        });
    }
}
