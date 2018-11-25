import { BBBackend, HTTPRequest } from '../common';

export default class BBNativeBackend extends BBBackend {
    public getBlackboardDomain(): string {
        throw new Error("Method not implemented.");
    }

    /* COURSES */
    public getEnrolledCourses(parameters: BBBackend.EnrolledCoursesParameter): Promise<BBBackend.ICourseID[]> {
        const path = "/learn/api/public/v1/users/" + parameters.userId + "/courses?offset=" + parameters.offset;
        console.log(path)
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
    public sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.ITaskComplete> {
        throw new Error("Method not implemented.");
    }
    public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
        throw new Error("Method not implemented.");
    }
    public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.ITaskComplete> {
        throw new Error("Method not implemented.");
    }

    /* USERS */

    public getUserInfo(parameters: BBBackend.UserParameter): Promise<BBBackend.IUserInfo> {
        if (parameters.userId) {
          const path = "/learn/api/public/v1/users/" + parameters.userId;
          return new Promise((resolve, reject) => {
              HTTPRequest.getAsync(path).then((response) => {
                  const userJson = JSON.parse(response);

                  const userObject: BBBackend.IUserInfo = {
                      id: userJson.id,
                      username: userJson.userName,
                      firstname: userJson.name.given,
                      surname: userJson.name.family,
                      student: userJson.studentId,
                      email: userJson.contact.email
                  };

                  resolve(userObject);
              });
        });
        } else if (parameters.userName) {
            const path = "/learn/api/public/v1/users?limit=1&userName=" + parameters.userName;
            return new Promise((resolve, reject) => {
                HTTPRequest.getAsync(path).then((response) => {
                    const userJson = JSON.parse(response);

                    if (userJson.results.length < 1) {
                        reject();
                        return;
                    }

                    const userObject: BBBackend.IUserInfo = {
                        id: userJson.results[0].id,
                        username: userJson.results[0].userName,
                        firstname: userJson.results[0].name.given,
                        surname: userJson.results[0].name.family,
                        student: userJson.results[0].studentId,
                        email: userJson.results[0].contact.email
                    };

                    resolve(userObject);
                });
            });
        }
    }
}
