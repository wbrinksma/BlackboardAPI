import Backend from './Backend';

export default class BBGroup {
    private _courseId: string;

    private groups: BBBackend.IGroup[];

    constructor(courseId: string) {
        this._courseId = courseId;
    }

    get courseId(): string {
        return this._courseId;
    }

    public getGroups(): Promise<BBBackend.IGroup[]> {
        return new Promise((resolve, reject) => {
            if (this.groups) {
                resolve(this.groups);
                return;
            }

            const parameters: BBBackend.CourseID = {
                courseId: this.courseId
            };

            Backend.getBackend().groups.getGroups(parameters).then((information) => {
                this.groups = information;
                resolve(this.groups);
            });
        });
    }
}
