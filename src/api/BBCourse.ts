import Backend from './Backend';

export default class BBCourse {
    private _courseId: string;

    private courseInformation: BBBackend.ICourseInformation;
    private courseContents: BBBackend.ICourseContent[];

    constructor(courseId: string) {
        this._courseId = courseId;
    }

    get courseId(): string {
        return this._courseId;
    }

    public getCourse(): Promise<BBBackend.ICourseInformation> {
        return new Promise((resolve, reject) => {
            if (this.courseInformation) {
                resolve(this.courseInformation);
                return;
            }

            const parameters: BBBackend.CourseID = {
                courseId: this._courseId
            };

            Backend.getBackend().getCourse(parameters).then((information) => {
                this.courseInformation = information;
                resolve(this.courseInformation);
            });
        });
    }

    public deleteCourse(): Promise<string> {
        return new Promise((resolve, reject) => {
            const parameters: BBBackend.CourseID = {
                courseId: this._courseId
            };

            Backend.getBackend().deleteCourse(parameters).then((information) => {
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

            const parameters: BBBackend.CourseID = {
                courseId: this._courseId
            };

            Backend.getBackend().getCourseContents(parameters).then((contents) => {
                this.courseContents = contents;
                resolve(this.courseContents);
            });
        });
    }
}
