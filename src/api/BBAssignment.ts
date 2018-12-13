import Backend from './Backend';

export default class BBAssignment {
    private _submission: string;

    private _courseId: string;
    private _contentId: string;

    constructor(courseId: string, contentId: string) {
        this._courseId = courseId;
        this._contentId = contentId;
    }

    get courseId(): string {
      return this._courseId;
    }

    get contentId(): string {
      return this._contentId;
    }

    get submission(): string {
      return this._submission;
    }

    public submit(submission: string): Promise<BBBackend.ITaskComplete> {
        this._submission = submission;

        return new Promise((resolve, reject) => {
            const parameters: BBBackend.AssignmentParameter = {
                contentId: this.contentId,
                courseId: this.courseId,
                submission: this.submission
            };

            Backend.getBackend().assignments.submit(parameters).then((task) => {
              task.success ? resolve(task) : reject();
            });
        });
    }
}
