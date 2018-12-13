export default class HTTPRequest {
    private static asyncRequest(type: string, url: string, formData: FormData = null): Promise<string> {
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

            getRequest.send(formData);
        });
    }
    public static getAsync(url: string): Promise<string> {
        return this.asyncRequest("GET",url);
    }

    public static postAsync(url: string, formData: FormData): Promise<string> {
        return this.asyncRequest("POST",url,formData)
    }

    public static deleteAsync(url: string): Promise<string> {
        return this.asyncRequest("DELETE",url);
    }

    public static patchAsync(url: string, formData: FormData): Promise<string> {
        return this.asyncRequest("PATCH",url,formData)
    }
}
