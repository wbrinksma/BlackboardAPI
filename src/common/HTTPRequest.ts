export default class HTTPRequest {
    public static getAsync(url: string): Promise<string> {
        const getRequest = new XMLHttpRequest();
        getRequest.open("GET", url);

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

            getRequest.send(null);
        });
    }

    public static postAsync(url: string, formData: FormData): Promise<string> {
        const postRequest = new XMLHttpRequest();
        postRequest.open("POST", url);

        return new Promise<string>((resolve, reject) => {
            postRequest.onload = (ev: ProgressEvent) => {
                if (postRequest.status === 200) {
                    resolve(postRequest.responseText);
                } else {
                    reject(postRequest.statusText);
                }
            };

            postRequest.onerror = () => {
                reject(postRequest.statusText);
            };

            postRequest.send(formData);
        });
    }
}
