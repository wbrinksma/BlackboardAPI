/**
 * Loader class for use with an Iframe element. This loader is used
 * to circumvent CORS problems and serves as a middle man between
 * the app and the Blackboard server.
 */
class IframeAppLoader extends AppLoader {
    private iframe : HTMLIFrameElement;
    private connectionManager : WindowConnectionManager;

    constructor(doc : Document, backend : BBBackend) {
        super();

        this.iframe = document.createElement("iframe");
        this.iframe.style.width = "100%";
        this.iframe.style.height = "100%";
        this.iframe.style.border = "0px";
        this.iframe.style.display = "none";
        doc.body.appendChild(this.iframe);

        this.connectionManager = new WindowConnectionManager(this.iframe.contentWindow, backend);
    }

    public loadApp(appUrl: string): void {
        this.iframe.src = appUrl;
        this.iframe.style.display = "";
    }
}