import Backend from './Backend';

export default class BBUser {
    private _userId: string;

    private enrolledCourses: BBBackend.ICourseID[];
    private grades: BBBackend.IGrade[];

    constructor(userId: string) {
        this._userId = userId;
    }

    get userId(): string {
        return this._userId;
    }

    public getEnrolledCourses(): Promise<BBBackend.ICourseID[]> {
        return new Promise((resolve, reject) => {
            if (this.enrolledCourses) {
                resolve(this.enrolledCourses);
                return;
            }

            const parameters: BBBackend.EnrolledCoursesParameter = {
                offset: 0,
                userId: this.userId
            };

            Backend.getBackend().courses.getEnrolledCourses(parameters).then((information) => {
                this.enrolledCourses = information;
                resolve(this.enrolledCourses);
            });
        });
    }

    public getGrades(course: BBBackend.CourseID): Promise<BBBackend.IGrade[]> {
        return new Promise((resolve, reject) => {
            if (this.grades) {
                resolve(this.grades);
                return;
            }

            const parameters: BBBackend.UserGradesParameter = {
                courseId: course.courseId,
                userId: this.userId
            };

            Backend.getBackend().gradeColumns.getUserGrades(parameters).then((information) => {
                this.grades = information;
                resolve(this.grades);
            });
        });
    }
}
