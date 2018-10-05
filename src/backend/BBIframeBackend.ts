class BBIframeBackend extends BBBackend {
    private readonly connectionManager : WindowConnectionManager;
    
    constructor(connectionManager? : WindowConnectionManager) {
        super();

        if(!connectionManager) {
            connectionManager = new WindowConnectionManager(window.parent);
        }

        this.connectionManager = connectionManager;
    }

    /**
     * This method provides a way to automate the sending process of method calls to the Iframe. It uses
     * the method's arguments and gets the name of the caller of this function that way. When this function
     * is called by another function in this class, it automatically gets the correct to name to send to the
     * Iframe.
     * @param parameters The parameters used with the function to send.
     */
    private sendMessageThroughConnectionManager(parameters : any) : Promise<any> {
        //Less quality solutation, but is implemented to circumvent strict-mode behaviour
        var callerName;
        try { throw new Error(); }
        catch (e) { 
            var re = /(\w+)@|at (\w+) \(/g, st = e.stack, m;
            re.exec(st), m = re.exec(st);
            callerName = m[1] || m[2];
        }

        return new Promise((resolve,reject) => {
            this.connectionManager.sendMessage(new WindowFunctionCall(callerName, parameters), (returnObject) => {
                resolve(returnObject);
            })
        });
    }

    public getEnrolledCourses(parameters : BBBackend.EnrolledCoursesParameter): Promise<BBBackend.CourseInformation[]> {
        return this.sendMessageThroughConnectionManager(parameters);
    }
    public getBlackboardDomain(): string {
        throw new Error("Method not implemented.");
    }
    public getCourseInformation(parameters: BBBackend.CourseIdParameter): Promise<BBBackend.CourseInformation> {
        return this.sendMessageThroughConnectionManager(parameters);
    }
    public sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.TaskComplete> {
        return this.sendMessageThroughConnectionManager(parameters);
    }
    public getFileInfo(parameters: BBBackend.CourseIdParameter): Promise<BBBackend.FileInfo> {
        return this.sendMessageThroughConnectionManager(parameters);
    }
    public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.TaskComplete> {
        return this.sendMessageThroughConnectionManager(parameters);
    }
}