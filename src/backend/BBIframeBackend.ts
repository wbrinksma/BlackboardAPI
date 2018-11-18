import {BBBackend, WindowConnectionManager, WindowFunctionCall} from '../common';

export default class BBIframeBackend extends BBBackend {
    private readonly connectionManager: WindowConnectionManager;

    constructor(connectionManager?: WindowConnectionManager) {
        super();

        if (!this.checkIfInsideIframe()) {
            throw new Error("BBIframeBackend not loaded inside Iframe");
        }

        if (!connectionManager) {
            connectionManager = new WindowConnectionManager(window.parent);
        }

        this.connectionManager = connectionManager;
    }

    public getEnrolledCourses(parameters: BBBackend.EnrolledCoursesParameter): Promise<BBBackend.ICourseInformation[]> {
        return this.sendMessageThroughConnectionManager("getEnrolledCourses", parameters);
    }
    public getBlackboardDomain(): string {
        throw new Error("Method not implemented.");
    }
    public getCourseInformation(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseInformation> {
        return this.sendMessageThroughConnectionManager("getCourseInformation", parameters);
    }
    public sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.ITaskComplete> {
        return this.sendMessageThroughConnectionManager("sendMail", parameters);
    }
    public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
        return this.sendMessageThroughConnectionManager("getFileInfo", parameters);
    }
    public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.ITaskComplete> {
        return this.sendMessageThroughConnectionManager("setFileBody", parameters);
    }

    private checkIfInsideIframe(): boolean {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    /**
     * This method provides a way to automate the sending process of method calls to the Iframe. It uses
     * the method's arguments and gets the name of the caller of this function that way. When this function
     * is called by another function in this class, it automatically gets the correct to name to send to the
     * Iframe.
     * @param methodSignature The signature (name) of the method you are trying to call on the top frame
     * @param parameters The parameters used with the function to send.
     */
    private sendMessageThroughConnectionManager(methodSignature: string, parameters: any): Promise<any> {
        console.log(parameters);
        return new Promise((resolve, reject) => {
            this.connectionManager.sendMessage(new WindowFunctionCall(methodSignature, parameters), (returnObject) => {
                resolve(returnObject);
            });
        });
    }
}
