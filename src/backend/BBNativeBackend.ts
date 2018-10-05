class BBNativeBackend extends BBBackend {
    public getBlackboardDomain(): string {
        throw new Error("Method not implemented.");
    }
    
    public getEnrolledCourses(parameters: BBBackend.EnrolledCoursesParameter): Promise<BBBackend.CourseInformation[]> {
        var path = "/learn/api/public/v1/users/" + parameters.userId + "/courses?offset=" + parameters.offset;

        return new Promise((resolve,reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                var allCourseInformation = JSON.parse(response);
                var responseInfo = new Array<BBBackend.CourseInformation>();

                allCourseInformation.results.forEach((result) => {
                    var resultObject : BBBackend.CourseInformation = {
                        id: result.courseId
                    }

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }
    
    public getCourseInformation(parameters: BBBackend.CourseIdParameter): Promise<BBBackend.CourseInformation> {
        throw new Error("Method not implemented.");
    }
    public sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.TaskComplete> {
        throw new Error("Method not implemented.");
    }
    public getFileInfo(parameters: BBBackend.CourseIdParameter): Promise<BBBackend.FileInfo> {
        throw new Error("Method not implemented.");
    }
    public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.TaskComplete> {
        throw new Error("Method not implemented.");
    }
}