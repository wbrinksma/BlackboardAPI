import Backend from './Backend';

export default class BBUserInfo {
    private _userName: string;

    private userInfo: BBBackend.IUserInfo;
    private enrolledCourses: BBBackend.ICourseID[];

    constructor(userName: string) {
        this._userName = userName;
    }

    get userName(): string {
        return this._userName;
    }

    public getUserInfo(): Promise<BBBackend.IUserInfo> {
        return new Promise((resolve, reject) => {
            if (this.userInfo) {
                resolve(this.userInfo);
                return;
            }

            const parameters: BBBackend.UserInfoParameter = {
                userName: this._userName
            };

            Backend.getBackend().getUserInfo(parameters).then((information) => {
                this.userInfo = information;
                resolve(this.userInfo);
            });
        });
    }

    public getEnrolledCourses(): Promise<BBBackend.ICourseID[]> {
        return new Promise((resolve, reject) => {
            if (this.enrolledCourses) {
                resolve(this.enrolledCourses);
                return;
            }

            this.getUserInfo().then((uinfo) => {
                const parameters: BBBackend.EnrolledCoursesParameter = {
                    offset: 0,
                    userId: uinfo.id
                };

                Backend.getBackend().getEnrolledCourses(parameters).then((information) => {
                    this.enrolledCourses = information;
                    resolve(this.enrolledCourses);
                });
            });
        });
    }
}
