import { BBAbstractBackend, WindowConnectionManager, WindowFunctionCall } from '../../common';
import BBCourses from './BBCourses';
import BBEmails from './BBEmails';
import BBFiles from './BBFiles';
import BBGroups from './BBGroups';
import BBMisc from './BBMisc';
import BBUsers from './BBUsers';

/**
 * @see BBAbstractBackend
 */
export default class BBIframeBackend extends BBAbstractBackend {

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

    public courses = new BBCourses('courses',this);
    public email = new BBEmails('email',this);
    public files = new BBFiles('files',this);
    public groups = new BBGroups('groups',this);
    public misc = new BBMisc('misc',this);
    public users = new BBUsers('users',this);

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
    public sendMessageThroughConnectionManager(category: string, methodSignature: string, parameters: any = null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connectionManager.sendMessage(new WindowFunctionCall(category, methodSignature, parameters), (returnObject) => {
                resolve(returnObject);
            });
        });
    }
}
