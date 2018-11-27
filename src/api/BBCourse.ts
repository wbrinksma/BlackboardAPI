import Backend from './Backend';
import { BBBackend } from '../common';

export default class BBCourse {
    private _courseId: BBBackend.CourseID;
    private courseInformation: BBBackend.ICourseInformation;
    private courseContents: BBBackend.ICourseContent[];
    private courseChildren: BBBackend.ICourseChild[];

    constructor(courseId: string = null) {
        this._courseId = {courseId};
    }

    get courseId(): string {
        return this.courseInformation.courseId;
    }

    public getCourse(): Promise<BBBackend.ICourseInformation> {
        return new Promise((resolve, reject) => {
            if (this.courseInformation) {
                resolve(this.courseInformation);
                return;
            }

            Backend.getBackend().getCourse(this._courseId).then((information) => {
                this.courseInformation = information;
                resolve(this.courseInformation);
            });
        });
    }

    public postCourse(): Promise<string> {
        return new Promise((resolve, reject) => {

            Backend.getBackend().postCourse().then((course) => {
                resolve(course);
            });
        });
    }

    public deleteCourse(): Promise<string> {
        return new Promise((resolve, reject) => {
            Backend.getBackend().deleteCourse(this._courseId).then((information) => {
                resolve(information);
            });
        });
    }

    public patchCourse(): Promise<string> {
        return new Promise((resolve, reject) => {
            Backend.getBackend().patchCourse(this._courseId).then((information) => {
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

            Backend.getBackend().getCourseContents(this._courseId).then((contents) => {
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

            Backend.getBackend().getCourseChildren(this._courseId).then((children) => {
                this.courseChildren = children;
                resolve(this.courseChildren);
            });
        });
    }

    public getCourseContent(contentId: string): Promise<BBBackend.ICourseContent> {
        return new Promise((resolve, reject) => {
            if (this.courseContents) {
                this.courseContents.forEach(element => {
                    if(element.id == contentId){
                        resolve(element);
                        return;
                    }
                });
            }

            const parameters: BBBackend.CourseContentParameter = {
                courseId: this._courseId.courseId,
                contentId: contentId
            };

            Backend.getBackend().getCourseContent(parameters).then((child) => {
                resolve(child);
            });
        });
    }

    public postCourseContent(): Promise<string> {
        return new Promise((resolve, reject) => {

            Backend.getBackend().postCourseContent(this._courseId).then((course) => {
                resolve(course);
            });
        });
    }

    public deleteCourseContent(contentId: string): Promise<string> {
        return new Promise((resolve, reject) => {

            const parameters: BBBackend.CourseContentParameter = {
                courseId: this._courseId.courseId,
                contentId: contentId
            };

            Backend.getBackend().deleteCourseContent(parameters).then((course) => {
                resolve(course);
            });
        });
    }

    public patchCourseContent(contentId: string): Promise<string> {
        return new Promise((resolve, reject) => {

            const parameters: BBBackend.CourseContentParameter = {
                courseId: this._courseId.courseId,
                contentId: contentId
            };

            Backend.getBackend().patchCourseContent(parameters).then((course) => {
                resolve(course);
            });
        });
    }

    public getCourseContentChildren(contentId: string): Promise<BBBackend.ICourseContent[]> {
        return new Promise((resolve, reject) => {

            const parameters: BBBackend.CourseContentParameter = {
                courseId: this._courseId.courseId,
                contentId: contentId
            };

            Backend.getBackend().getCourseContentChildren(parameters).then((course) => {
                resolve(course);
            });
        });
    }
}
