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

    public getCourse(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseInformation> {
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

    public deleteCourse(parameters: BBBackend.CourseID): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId;
        return new Promise((resolve, reject) => {
            HTTPRequest.deleteAsync(path).then((response) => {
                resolve(response);
            });
        });
    }

    public patchCourse(parameters: BBBackend.CourseID): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId;
        return new Promise((resolve, reject) => {
            HTTPRequest.patchAsync(path,null).then((response) => {
                resolve(response);
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

    public getCourseChildren(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseChild[]> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/children";
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const allCourseChildren = JSON.parse(response);
                const responseInfo = new Array<BBBackend.ICourseChild>();

                allCourseChildren.results.forEach((result) => {
                    const resultObject: BBBackend.ICourseChild = {
                        id: result.id,
                        datasourceId: result.datasourceId,
                        created: result.created
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
