import { BBBackend, HTTPRequest } from '../common';

export default class BBNativeBackend extends BBBackend {
    public getBlackboardDomain(): string {
        throw new Error("Method not implemented.");
    }

    public getEnrolledCourses(parameters: BBBackend.EnrolledCoursesParameter): Promise<BBBackend.ICourseID[]> {
        const path = "/learn/api/public/v1/users/" + parameters.userId + "/courses?offset=" + parameters.offset;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const allCourseInformation = JSON.parse(response);
                const responseInfo = new Array<BBBackend.ICourseID>();

                allCourseInformation.results.forEach((result) => {
                    const resultObject: BBBackend.ICourseID = {
                        id: result.courseId,
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }


    /* COURSES */

    public getCourseInformation(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseInformation> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const courseInformation = JSON.parse(response);

                const resultObject: BBBackend.ICourseInformation = {
                    id: courseInformation.courseId,
                    name: courseInformation.name,
                    description: courseInformation.description
                };

                resolve(resultObject);
            });
        });
    }

    public getCourseContents(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseContent[]> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents";
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const allCourseContents = JSON.parse(response);
                const responseInfo = new Array<BBBackend.ICourseContent>();

                allCourseContents.results.forEach((result) => {
                    const resultObject: BBBackend.ICourseContent = {
                        id: result.id,
                        title: result.title,
                        position: result.position
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }

    public sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.ITaskComplete> {
        throw new Error("Method not implemented.");
    }
    public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
        throw new Error("Method not implemented.");
    }
    public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.ITaskComplete> {
        throw new Error("Method not implemented.");
    }
}
