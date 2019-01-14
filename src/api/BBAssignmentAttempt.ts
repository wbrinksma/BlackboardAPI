import Backend from './Backend';

export default class BBAssignmentAttempt {
    private readonly _courseId: string;
    private readonly _columnId: string;
    private readonly _assignmentId: string;
    private assignmentInformation: BBBackend.IAssignmentAttempt;

    constructor(courseId: string, columnId: string, assignmentId: string) {
        this._courseId = courseId;
        this._columnId = columnId;
        this._assignmentId = assignmentId;
        this.getAttemptInformation();
    }

    get courseId(): string {
        return this._courseId;
    }

    get columnId(): string {
        return this._columnId;
    }

    get assignmentId(): string {
        return this._assignmentId;
    }

    public getAttemptInformation(): Promise<BBBackend.IAssignmentAttempt> {
        return new Promise((resolve, reject) => {
            if (this.assignmentInformation) {
                resolve(this.assignmentInformation);
                return;
            }

            const parameters: BBBackend.AssignmentID = {
                attemptId: this._assignmentId,
                columnId: this._columnId,
                courseId: this._courseId
            };

            Backend.getBackend().gradeColumns.getAssignmentAttempt(parameters).then((information) => {
                this.assignmentInformation = information;
                resolve(this.assignmentInformation);
            });
        });
    }
}
