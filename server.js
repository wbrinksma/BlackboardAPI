class BBBackend {
}
class HTTPRequest {
    static getAsync(url) {
        var getRequest = new XMLHttpRequest();
        getRequest.open("GET", url);
        return new Promise((resolve, reject) => {
            getRequest.onload = (ev) => {
                if (getRequest.status == 200) {
                    resolve(getRequest.responseText);
                }
                else {
                    reject(getRequest.statusText);
                }
            };
            getRequest.onerror = () => {
                reject(getRequest.statusText);
            };
            getRequest.send(null);
        });
    }
    static postAsync(url, formData) {
        var postRequest = new XMLHttpRequest();
        postRequest.open("POST", url);
        return new Promise((resolve, reject) => {
            postRequest.onload = (ev) => {
                if (postRequest.status == 200) {
                    resolve(postRequest.responseText);
                }
                else {
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
class Utilities {
    static getNonceFromForm(doc, formName) {
        var form = doc.getElementsByName(formName)[0];
        form.getInputs().forEach(input => {
            if (input.name == "blackboard.platform.security.NonceUtil.nonce") {
                return input.value;
            }
        });
        return "";
    }
    static encodeEntities(value) {
        return value.
            replace(/&/g, '&amp;').
            replace(Utilities.SURROGATE_PAIR_REGEXP, function (value) {
            var hi = value.charCodeAt(0);
            var low = value.charCodeAt(1);
            return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
        }).
            replace(Utilities.NON_ALPHANUMERIC_REGEXP, function (value) {
            return '&#' + value.charCodeAt(0) + ';';
        }).
            replace(/</g, '&lt;').
            replace(/>/g, '&gt;');
    }
}
Utilities.SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
Utilities.NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;
class WindowConnectionManager {
    constructor(_window, backend) {
        this.window = _window;
        this.callbackList = new Object();
        this.backend = backend;
        var selfRef = this;
        window.addEventListener("message", (event) => {
            WindowConnectionManager.receiveMessage(selfRef, event);
        }, false);
    }
    sendMessage(message, onReturn) {
        if (onReturn) {
            this.callbackList[message.uuid] = onReturn;
        }
        this.window.postMessage(message, "*");
    }
    static receiveMessage(connectionManager, event) {
        var message = WindowMessageFactory.fromJson(event.data);
        if (message instanceof WindowFunctionCall) {
            if (connectionManager.backend) {
                var fcMessage = message;
                connectionManager.backend[fcMessage.methodSignature](fcMessage.parameters).then((value) => {
                    connectionManager.sendMessage(new WindowFunctionReturn(value, fcMessage.uuid));
                });
            }
        }
        else if (message instanceof WindowFunctionReturn) {
            var frMessage = message;
            connectionManager.callbackList[frMessage.uuid](frMessage.returnValue);
            delete connectionManager.callbackList[frMessage.uuid];
        }
    }
}
var WindowMessageType;
(function (WindowMessageType) {
    WindowMessageType[WindowMessageType["FUNCTION"] = 1] = "FUNCTION";
    WindowMessageType[WindowMessageType["RETURN"] = 2] = "RETURN";
})(WindowMessageType || (WindowMessageType = {}));
class WindowMessageFactory {
    static fromJson(jsonObject) {
        var baseMessage = WindowMessage.fromJsonObject(jsonObject);
        switch (baseMessage.type) {
            case WindowMessageType.FUNCTION:
                return WindowFunctionCall.fromJsonObject(jsonObject);
            case WindowMessageType.RETURN:
                return WindowFunctionReturn.fromJsonObject(jsonObject);
        }
        throw new Error("No WindowMessage variant found for given data");
    }
}
class WindowMessage {
    constructor(type, uuid) {
        if (uuid) {
            this.uuid = uuid;
        }
        else {
            this.uuid = WindowMessage.generateUuidv4();
        }
        this.type = type;
    }
    toJsonObject() {
        var returnObject = {};
        returnObject[WindowMessage.UUID_ID] = this.uuid;
        returnObject[WindowMessage.TYPE_ID] = this.type;
        return returnObject;
    }
    static fromJsonObject(jsonObject) {
        return new WindowMessage(jsonObject[WindowMessage.TYPE_ID], jsonObject[WindowMessage.UUID_ID]);
    }
    static generateUuidv4() {
        return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => {
            var cNum = parseInt(c);
            return (cNum ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> cNum / 4).toString(16);
        });
    }
}
WindowMessage.UUID_ID = "uuid";
WindowMessage.TYPE_ID = "type";
class WindowFunctionCall extends WindowMessage {
    constructor(methodSignature, parameters, uuid) {
        if (uuid) {
            super(WindowMessageType.FUNCTION, uuid);
        }
        else {
            super(WindowMessageType.FUNCTION);
        }
        this.methodSignature = methodSignature;
        this.parameters = parameters;
    }
    toJsonObject() {
        var s = super.toJsonObject();
        s[WindowFunctionCall.METHOD_SIGNATURE_ID] = this.methodSignature;
        s[WindowFunctionCall.PARAMETERS_ID] = this.parameters;
        return s;
    }
    tryCall(backend, callBack) {
        return backend[this.methodSignature](this.parameters, callBack);
    }
    static fromJsonObject(jsonObject) {
        var superImpl = WindowMessage.fromJsonObject(jsonObject);
        return new WindowFunctionCall(jsonObject[WindowFunctionCall.METHOD_SIGNATURE_ID], jsonObject[WindowFunctionCall.PARAMETERS_ID], superImpl.uuid);
    }
}
WindowFunctionCall.METHOD_SIGNATURE_ID = "methodSignature";
WindowFunctionCall.PARAMETERS_ID = "parameters";
class WindowFunctionReturn extends WindowMessage {
    constructor(returnValue, uuid) {
        if (uuid) {
            super(WindowMessageType.RETURN, uuid);
        }
        else {
            super(WindowMessageType.RETURN);
        }
        this.returnValue = returnValue;
    }
    toJsonObject() {
        var s = super.toJsonObject();
        s[WindowFunctionReturn.RETURN_VALUE_ID] = this.returnValue;
        return s;
    }
    static fromJsonObject(jsonObject) {
        var superImpl = WindowMessage.fromJsonObject(jsonObject);
        return new WindowFunctionReturn(jsonObject[WindowFunctionReturn.RETURN_VALUE_ID], superImpl.uuid);
    }
}
WindowFunctionReturn.RETURN_VALUE_ID = "returnValue";
class BBIframeBackend extends BBBackend {
    constructor(connectionManager) {
        super();
        if (!this.checkIfInsideIframe()) {
            throw new Error("BBIframeBackend not loaded inside Iframe");
        }
        if (!connectionManager) {
            connectionManager = new WindowConnectionManager(window.parent);
        }
        this.connectionManager = connectionManager;
    }
    checkIfInsideIframe() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    sendMessageThroughConnectionManager(methodSignature, parameters) {
        return new Promise((resolve, reject) => {
            this.connectionManager.sendMessage(new WindowFunctionCall(methodSignature, parameters), (returnObject) => {
                resolve(returnObject);
            });
        });
    }
    getEnrolledCourses(parameters) {
        return this.sendMessageThroughConnectionManager("getEnrolledCourses", parameters);
    }
    getBlackboardDomain() {
        throw new Error("Method not implemented.");
    }
    getCourseInformation(parameters) {
        return this.sendMessageThroughConnectionManager("getCourseInformation", parameters);
    }
    sendMail(parameters) {
        return this.sendMessageThroughConnectionManager("sendMail", parameters);
    }
    getFileInfo(parameters) {
        return this.sendMessageThroughConnectionManager("getFileInfo", parameters);
    }
    setFileBody(parameters) {
        return this.sendMessageThroughConnectionManager("setFileBody", parameters);
    }
}
class BBNativeBackend extends BBBackend {
    getBlackboardDomain() {
        throw new Error("Method not implemented.");
    }
    getEnrolledCourses(parameters) {
        var path = "/learn/api/public/v1/users/" + parameters.userId + "/courses?offset=" + parameters.offset;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                var allCourseInformation = JSON.parse(response);
                var responseInfo = new Array();
                allCourseInformation.results.forEach((result) => {
                    var resultObject = {
                        id: result.courseId
                    };
                    responseInfo.push(resultObject);
                });
                resolve(responseInfo);
            });
        });
    }
    getCourseInformation(parameters) {
        throw new Error("Method not implemented.");
    }
    sendMail(parameters) {
        throw new Error("Method not implemented.");
    }
    getFileInfo(parameters) {
        throw new Error("Method not implemented.");
    }
    setFileBody(parameters) {
        throw new Error("Method not implemented.");
    }
}
class AppLoader {
}
class IframeAppLoader extends AppLoader {
    constructor(doc, backend) {
        super();
        this.iframe = document.createElement("iframe");
        this.iframe.style.width = "100%";
        this.iframe.style.height = "100%";
        this.iframe.style.border = "0px";
        this.iframe.style.display = "none";
        doc.body.appendChild(this.iframe);
        this.connectionManager = new WindowConnectionManager(this.iframe.contentWindow, backend);
    }
    loadApp(appUrl) {
        this.iframe.src = appUrl;
        this.iframe.style.display = "";
    }
}
