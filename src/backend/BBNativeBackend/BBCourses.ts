import { HTTPRequest } from '../../common';
import Courses from '../../common/BBAbstractBackend/courses';

export default class BBCourses extends Courses {
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

    public getCourseInformation(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseInformation> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const courseInformation = JSON.parse(response);

                const resultObject: BBBackend.ICourseInformation = {
                    id: courseInformation.courseId,
                    uuid: courseInformation.uuid,
                    externalId: courseInformation.externalId,
                    dataSourceId: courseInformation.dataSourceId,
                    courseId: courseInformation.courseId,
                    name: courseInformation.name,
                    description: courseInformation.description,
                    created: courseInformation.created,
                    organization: courseInformation.organization,
                    ultraStatus: courseInformation.ultraStatus,
                    allowGuests: courseInformation.allowGuests,
                    readOnly: courseInformation.readOnly,
                    available: courseInformation.availability.available,
                    duration: courseInformation.availability.duration.type,
                    enrollment: courseInformation.enrollment.type,
                    accessCode: courseInformation.enrollment.accessCode,
                    locale: courseInformation.locale.force,
                    hasChildren: courseInformation.hasChildren,
                    parentId: courseInformation.parentId
                }
            });
        });
    }

    public postCourse(): Promise<string> {
        const path = "/learn/api/public/v1/courses/"
        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, null).then((response) => {
                resolve(response);
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
                        parentId: result.parentId,
                        title: result.title,
                        body: result.body,
                        description: result.description,
                        created: result.created,
                        position: result.position,
                        hasChildren: result.hasChildren,
                        hasGrafebookColumns: result.hasGrafebookColumns,
                        hasAssociatedGroups: result.hasAssociatedGroups,
                        available: result.availability.available,
                        allowGuests: result.availability.allowGuests
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }

    public postCourseContent(parameters: BBBackend.CourseID): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + '/contents'
        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, null).then((response) => {
                resolve(response);
            });
        });
    }

    public deleteCourseContent(parameters: BBBackend.CourseContentParameter): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + '/contents/' + parameters.contentId
        return new Promise((resolve, reject) => {
            HTTPRequest.deleteAsync(path).then((response) => {
                resolve(response);
            });
        });
    }

    public patchCourseContent(parameters: BBBackend.CourseContentParameter): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId;
        return new Promise((resolve, reject) => {
            HTTPRequest.patchAsync(path, null).then((response) => {
                resolve(response);
            });
        });
    }

    public getCourseContent(parameters: BBBackend.CourseContentParameter): Promise<BBBackend.ICourseContent> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const result = JSON.parse(response);

                const resultObject: BBBackend.ICourseContent = {
                    id: result.id,
                    parentId: result.parentId,
                    title: result.title,
                    body: result.body,
                    description: result.description,
                    created: result.created,
                    position: result.position,
                    hasChildren: result.hasChildren,
                    hasGrafebookColumns: result.hasGrafebookColumns,
                    hasAssociatedGroups: result.hasAssociatedGroups,
                    available: result.availability.available,
                    allowGuests: result.availability.allowGuests
                };

                resolve(resultObject);
            });
        });
    }

    public getCourseContentChildren(parameters: BBBackend.CourseContentParameter): Promise<BBBackend.ICourseContent[]> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId + '/children';
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const allCourseContents = JSON.parse(response);
                const responseInfo = new Array<BBBackend.ICourseContent>();

                allCourseContents.results.forEach((result) => {
                    const resultObject: BBBackend.ICourseContent = {
                        id: result.id,
                        parentId: result.parentId,
                        title: result.title,
                        body: result.body,
                        description: result.description,
                        created: result.created,
                        position: result.position,
                        hasChildren: result.hasChildren,
                        hasGrafebookColumns: result.hasGrafebookColumns,
                        hasAssociatedGroups: result.hasAssociatedGroups,
                        available: result.availability.available,
                        allowGuests: result.availability.allowGuests
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }

    public postCourseContentChildren(parameters: BBBackend.CourseContentParameter): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId + '/children';
        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, null).then((response) => {
                resolve(response);
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
                        created: result.created,
                        datasourceId: result.datasourceId,
                        id: result.id
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }

    public getAssignmentsCol(parameters: BBBackend.CourseID): Promise<BBBackend.IAssignment[]> {
        const path: string = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/columns";

        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const assignmentInformation = JSON.parse(response);
                const responseInfo = new Array<BBBackend.IAssignment>();

                assignmentInformation.results.forEach((result) => {
                    const resultObject: BBBackend.IAssignment = {
                        available: result.availability.available,
                        contentId: result.contentId,
                        decimals: result.score.decimalPlaces,
                        desc: result.description,
                        id: result.id,
                        name: result.name,
                        possibleScore: result.score.possible
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }

    public createAssignmentCol(parameters: BBBackend.CreateColParameter): Promise<BBBackend.IAssignment> {
      const path: string = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/columns";
      const formData = new FormData();

      formData.append('courseId', parameters.courseId); // Obsolete?
      formData.append('input', parameters.body);

      return new Promise((resolve, reject) => {
        HTTPRequest.postAsync(path, formData).then((response) => {
          const information = JSON.parse(response);
          const column: BBBackend.IAssignment = {
            available: information.availability.available,
            contentId: information.contentId,
            decimals: information.decimals,
            desc: information.description,
            id: information.id,
            name: information.name,
            possibleScore: information.score.possible
          };

          resolve(column);
        });
      });
    }
}
