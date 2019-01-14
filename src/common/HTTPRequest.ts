export default class HTTPRequest {
    private static asyncRequest(type: string, url: string, formData: FormData | string = null, format: string = 'text'): Promise<string> {
        const getRequest = new XMLHttpRequest();
        getRequest.open(type, url);
        if(format == 'form'){
            getRequest.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=UTF-8')
        }
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
        return this.asyncRequest("GET", url);
    }

    public static postAsync(url: string, formData: FormData | string, format: string = 'text'): Promise<string> {
        return this.asyncRequest("POST", url, formData, format);
    }

    public static deleteAsync(url: string): Promise<string> {
        return this.asyncRequest("DELETE", url);
    }

    public static patchAsync(url: string, formData: FormData | string): Promise<string> {
        return this.asyncRequest("PATCH", url, formData);
    }
}
