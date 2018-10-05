class WindowConnectionManager {
    private window;
    private callbackList;
    private backend : BBBackend;

    constructor(_window : Window, backend? : BBBackend) {
        this.window = _window;
        this.callbackList = new Object();
        this.backend = backend;

        var selfRef = this;

        window.addEventListener("message", (event) => {
            WindowConnectionManager.receiveMessage(selfRef, event);
        }, false);
    }

    public sendMessage(message : WindowMessage, onReturn? : (returnObject : any) => void) : void {
        if(onReturn) {
            this.callbackList[message.uuid] = onReturn;
        }

        this.window.postMessage(message, "*");
    }

    private static receiveMessage(connectionManager : WindowConnectionManager, event : MessageEvent) {
        var message = WindowMessageFactory.fromJson(event.data);

        if(message instanceof WindowFunctionCall) {
            if(connectionManager.backend) {
                var fcMessage = message as WindowFunctionCall;
                connectionManager.backend[fcMessage.methodSignature](fcMessage.parameters).then((value) => {
                    connectionManager.sendMessage(new WindowFunctionReturn(value, fcMessage.uuid));
                });
            }
        }
        else if (message instanceof WindowFunctionReturn) {
            var frMessage = message as WindowFunctionReturn;
            connectionManager.callbackList[frMessage.uuid](frMessage.returnValue);
            delete connectionManager.callbackList[frMessage.uuid];
        }
    }
}