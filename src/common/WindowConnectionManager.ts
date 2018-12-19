import BBAbstractBackend from './BBAbstractBackend';
import { WindowFunctionCall, WindowFunctionReturn, WindowMessage, WindowMessageFactory } from './WindowMessage';

export default class WindowConnectionManager {
    private window: Window;
    private callbackList;
    private backend: BBAbstractBackend;

    constructor(_window: Window, backend?: BBAbstractBackend) {
        this.window = _window;
        this.callbackList = {};
        this.backend = backend;

        const selfRef = this;

        window.addEventListener("message", (event) => {
            WindowConnectionManager.receiveMessage(selfRef, event);
        }, false);
    }

    public sendMessage(message: WindowMessage, onReturn?: (returnObject: any) => void): void {
        if (onReturn) {
            this.callbackList[message.uuid] = onReturn;
        }

        this.window.postMessage(message, "*");
    }

    private static receiveMessage(connectionManager: WindowConnectionManager, event: MessageEvent) {
        const message = WindowMessageFactory.fromJson(event.data);

        if (message instanceof WindowFunctionCall) {
            if (connectionManager.backend) {
                const fcMessage: WindowFunctionCall = message;
                connectionManager.backend[fcMessage.category][fcMessage.methodSignature](fcMessage.parameters).then((value) => {
                    connectionManager.sendMessage(new WindowFunctionReturn(value, fcMessage.uuid));
                });
            }
        } else if (message instanceof WindowFunctionReturn) {
            const frMessage: WindowFunctionReturn = message;

            if (frMessage.uuid in connectionManager.callbackList) {
                connectionManager.callbackList[frMessage.uuid](frMessage.returnValue);
                delete connectionManager.callbackList[frMessage.uuid];
            }
        }
    }
}
