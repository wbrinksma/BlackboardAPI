/* tslint:disable:object-literal-sort-keys */

import Backend from './Backend';

export default class BBCourse {
    private _courseId: BBBackend.CourseID;
    private courseInformation: BBBackend.ICourseInformation;
    private courseContents: BBBackend.ICourseContent[];
    private courseChildren: BBBackend.ICourseChild[];
    private assignments: BBBackend.IAssignment[];

    constructor(courseId: string = null) {
        this._courseId = {courseId};
        this.getCourseInformation();
    }

    get courseId(): string {
        this.getCourseInformation().then(() => {
            return this.courseInformation.courseId;
        });
        return;
    }

    get courseName(): string {
        this.getCourseInformation().then(() => {
            return this.courseInformation.name;
        });
        return;
    }

    public getCourseInformation(): Promise<BBBackend.ICourseInformation> {
        return new Promise((resolve, reject) => {
            if (this.courseInformation) {
                resolve(this.courseInformation);
                return;
            }
            Backend.getBackend().courses.getCourseInformation(this._courseId).then((information) => {
                this.courseInformation = information;
                resolve(this.courseInformation);
            });
        });
    }

    public postCourse(): Promise<string> {
        return new Promise((resolve, reject) => {

            Backend.getBackend().courses.postCourse().then((course) => {
                resolve(course);
            });
        });
    }

    public deleteCourse(): Promise<string> {
        return new Promise((resolve, reject) => {
            Backend.getBackend().courses.deleteCourse(this._courseId).then((information) => {
                resolve(information);
            });
        });
    }

    public patchCourse(): Promise<string> {
        return new Promise((resolve, reject) => {
            Backend.getBackend().courses.patchCourse(this._courseId).then((information) => {
                resolve(information);
            });
        });
    }

    public getCourseContents(): Promise<BBBackend.ICourseContent[]> {
        return new Promise((resolve, reject) => {
            if (this.courseContents) {
                resolve(this.courseContents);
                return;
            }

            Backend.getBackend().courses.getCourseContents(this._courseId).then((contents) => {
                this.courseContents = contents;
                resolve(this.courseContents);
            });
        });
    }

    public getCourseChildren(): Promise<BBBackend.ICourseChild[]> {
        return new Promise((resolve, reject) => {
            if (this.courseChildren) {
                resolve(this.courseChildren);
                return;
            }

            Backend.getBackend().courses.getCourseChildren(this._courseId).then((children) => {
                this.courseChildren = children;
                resolve(this.courseChildren);
            });
        });
    }

    public getCourseContent(contentId: string): Promise<BBBackend.ICourseContent> {
        return new Promise((resolve, reject) => {
            if (this.courseContents) {
                this.courseContents.forEach((element) => {
                    if (element.id == contentId) {
                        resolve(element);
                        return;
                    }
                });
            }

            const parameters: BBBackend.CourseContentParameter = {
                courseId: this._courseId.courseId,
                contentId
            };

            Backend.getBackend().courses.getCourseContent(parameters).then((child) => {
                resolve(child);
            });
        });
    }

    public postCourseContent(): Promise<string> {
        return new Promise((resolve, reject) => {

            Backend.getBackend().courses.postCourseContent(this._courseId).then((course) => {
                resolve(course);
            });
        });
    }

    public deleteCourseContent(contentId: string): Promise<string> {
        return new Promise((resolve, reject) => {

            const parameters: BBBackend.CourseContentParameter = {
                courseId: this._courseId.courseId,
                contentId
            };

            Backend.getBackend().courses.deleteCourseContent(parameters).then((course) => {
                resolve(course);
            });
        });
    }

    public patchCourseContent(contentId: string): Promise<string> {
        return new Promise((resolve, reject) => {

            const parameters: BBBackend.CourseContentParameter = {
                courseId: this._courseId.courseId,
                contentId
            };

            Backend.getBackend().courses.patchCourseContent(parameters).then((course) => {
                resolve(course);
            });
        });
    }

    public getCourseContentChildren(contentId: string): Promise<BBBackend.ICourseContent[]> {
        return new Promise((resolve, reject) => {

            const parameters: BBBackend.CourseContentParameter = {
                courseId: this._courseId.courseId,
                contentId
            };

            Backend.getBackend().courses.getCourseContentChildren(parameters).then((course) => {
                resolve(course);
            });
        });
    }

    public postCourseContentChildren(contentId: string): Promise<string> {
        return new Promise((resolve, reject) => {

            const parameters: BBBackend.CourseContentParameter = {
                courseId: this._courseId.courseId,
                contentId
            };

            Backend.getBackend().courses.postCourseContentChildren(parameters).then((course) => {
                resolve(course);
            });
        });
    }

    public getAssignments(): Promise<BBBackend.IAssignment[]> {
        return new Promise((resolve, reject) => {
            if (this.assignments) {
                resolve(this.assignments);
                return;
            }

            Backend.getBackend().courses.getAssignments(this._courseId).then((assignments) => {
                resolve(assignments);
            });
        });
    }

    public createAssignmentCol(config: string): Promise<BBBackend.IAssignment> {
        return new Promise((resolve, reject) => {
            const parameters: BBBackend.CreateColParameter = {
                courseId: this._courseId.courseId,
                body: config
            };

            Backend.getBackend().courses.createAssignmentCol(parameters).then((assignment) => {
                resolve(assignment);
            });
        });
    }
}
