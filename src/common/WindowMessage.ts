/* tslint:disable:max-classes-per-file */

import BBAbstractBackend from './BBAbstractBackend';

export enum WindowMessageType {
    FUNCTION = 1,
    RETURN = 2
}

export class WindowMessageFactory {
    public static fromJson(jsonObject: any) {
        const baseMessage = WindowMessage.fromJsonObject(jsonObject);

        switch (baseMessage.type) {
            case WindowMessageType.FUNCTION:
                return WindowFunctionCall.fromJsonObject(jsonObject);
            case WindowMessageType.RETURN:
                return WindowFunctionReturn.fromJsonObject(jsonObject);
        }

        throw new Error("No WindowMessage variant found for given data");
    }
}

export class WindowMessage {
    private static readonly UUID_ID = "uuid";
    private static readonly TYPE_ID = "type";

    public readonly uuid: string;
    public readonly type: WindowMessageType;

    constructor(type: WindowMessageType, uuid?: string) {
        if (uuid) {
            this.uuid = uuid;
        } else {
            this.uuid = WindowMessage.generateUuidv4();
        }

        this.type = type;
    }

    public toJsonObject(): any {
        const returnObject = {};
        returnObject[WindowMessage.UUID_ID] = this.uuid;
        returnObject[WindowMessage.TYPE_ID] = this.type;
        return returnObject;
    }

    public static fromJsonObject(jsonObject: any): WindowMessage {
        return new WindowMessage(
            jsonObject[WindowMessage.TYPE_ID],
            jsonObject[WindowMessage.UUID_ID]
        );
    }

    public static generateUuidv4(): string {
        return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => {
            // tslint:disable-next-line:radix
            const cNum = parseInt(c);
            // tslint:disable-next-line:no-bitwise
            return (cNum ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> cNum / 4).toString(16);
        });
    }
}

export class WindowFunctionCall extends WindowMessage {
    private static readonly METHOD_SIGNATURE_ID = "methodSignature";
    private static readonly PARAMETERS_ID = "parameters";

    public readonly methodSignature: string;
    public readonly parameters: any;

    constructor(methodSignature: string, parameters: any, uuid?: string) {
        if (uuid) {
            super(WindowMessageType.FUNCTION, uuid);
        } else {
            super(WindowMessageType.FUNCTION);
        }

        this.methodSignature = methodSignature;
        this.parameters = parameters;
    }

    public toJsonObject(): any {
        const s = super.toJsonObject();
        s[WindowFunctionCall.METHOD_SIGNATURE_ID] = this.methodSignature;
        s[WindowFunctionCall.PARAMETERS_ID] = this.parameters;
        return s;
    }

    public tryCall(backend: BBAbstractBackend, callBack: (data) => void): any {
        return backend[this.methodSignature](this.parameters, callBack);
    }

    public static fromJsonObject(jsonObject: any): WindowMessage {
        const superImpl = WindowMessage.fromJsonObject(jsonObject);
        return new WindowFunctionCall(
            jsonObject[WindowFunctionCall.METHOD_SIGNATURE_ID],
            jsonObject[WindowFunctionCall.PARAMETERS_ID],
            superImpl.uuid
        );
    }
}

export class WindowFunctionReturn extends WindowMessage {
    private static readonly RETURN_VALUE_ID = "returnValue";

    public returnValue: any;

    constructor(returnValue: any, uuid?: string) {
        if (uuid) {
            super(WindowMessageType.RETURN, uuid);
        } else {
            super(WindowMessageType.RETURN);
        }

        this.returnValue = returnValue;
    }

    public toJsonObject(): any {
        const s = super.toJsonObject();
        s[WindowFunctionReturn.RETURN_VALUE_ID] = this.returnValue;
        return s;
    }

    public static fromJsonObject(jsonObject: any): WindowMessage {
        const superImpl = WindowMessage.fromJsonObject(jsonObject);
        return new WindowFunctionReturn(
            jsonObject[WindowFunctionReturn.RETURN_VALUE_ID],
            superImpl.uuid
        );
    }
}
