import Backend from './Backend';

export default class BBAssignment {
    private _submission: string;

    private assignment: BBBackend.IAssignment;
    private course: BBBackend.CourseID;

    constructor(courseId: string) {
        this.course = {courseId};
    }

    get courseId(): string {
      return this.course.courseId;
    }

    get contentId(): string {
      return this.assignment.contentId;
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
