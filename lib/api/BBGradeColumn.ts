/* tslint:disable:object-literal-sort-keys */

import Backend from './Backend';

export default class BBGradeColumn {
    private _columnId: BBBackend.ColumnID;
    private _column: BBBackend.IAssignment;

    constructor(courseId: string, columnId: string) {
        this._columnId = {
          courseId,
          columnId
        };
    }

    get columnId(): string {
      return this._columnId.columnId;
    }

    get courseId(): string {
      return this._columnId.courseId;
    }

    public getAssignmentCol(): Promise<BBBackend.IAssignment> {
        return new Promise((resolve) => {
            if (this._column) {
                resolve(this._column);
                return;
            }

            Backend.getBackend().gradeColumns.getAssignmentCol(this._columnId).then((information) => {
                this._column = information;
                resolve(information);
            });
        });
    }

    public deleteAssignmentCol(): Promise<BBBackend.ITaskComplete> {
        return new Promise((resolve) => {
            Backend.getBackend().gradeColumns.deleteAssignmentCol(this._columnId).then((information) => {
                const response: BBBackend.ITaskComplete = {success: true};

                resolve(response);
            });
        });
	}
	
	public getAssignmentAttempts(): Promise<BBBackend.IAssignmentAttempt[]> {
		return new Promise((resolve) => {
            Backend.getBackend().gradeColumns.getAssignmentAttempts(this._columnId).then((information) => {
                resolve(information);
            });
        });
	}

	public getAssignmentAttempt(assignmentId: any): Promise<BBBackend.IAssignmentAttempt> {
		return new Promise((resolve) => {
            Backend.getBackend().gradeColumns.getAssignmentAttempt(assignmentId).then((information) => {
                resolve(information);
            });
        });
	}
}
