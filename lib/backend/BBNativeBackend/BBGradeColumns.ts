/* tslint:disable:max-line-length */

import { HTTPRequest, Utilities } from '../../common';
import GradeColumns from '../../common/BBAbstractBackend/gradeColumns';

export default class BBGradeColumns extends GradeColumns {
    public getAssignmentCols(parameters: BBBackend.CourseID): Promise<BBBackend.IAssignment[]> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns";
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const columns: any[] = JSON.parse(response);

                const result: BBBackend.IAssignment[] = [];

                for (const column of columns) {
                    result.push(this.createIAssignment(column));
                }

                resolve(result);
            });
        });
    }

    public getAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignment> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const column: any = JSON.parse(response);

                const result: BBBackend.IAssignment = this.createIAssignment(column);

                resolve(result);
            });
        });
    }

    public deleteAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.ITaskComplete> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
        return new Promise((resolve, reject) => {
            HTTPRequest.deleteAsync(path).then((response) => {
                const result: BBBackend.ITaskComplete = {success: true};

                resolve(result);
            });
        });
    }

    public createAssignmentCol(parameters: BBBackend.CreateColParameter): Promise<BBBackend.IAssignment> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns";
        const formData = new FormData();
        formData.append('input', parameters.body);

        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, formData).then((response) => {
                const information = JSON.parse(response);
                const column: BBBackend.IAssignment = this.createIAssignment(information);

                resolve(column);
            });
        });
    }

    public updateAssignmentCol(parameters: BBBackend.UpdateColParameter): Promise<BBBackend.IAssignment> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
        const formData = new FormData();
        formData.append('input', parameters.body);

        return new Promise((resolve, reject) => {
            HTTPRequest.patchAsync(path, formData).then((response) => {
                const information = JSON.parse(response);
                const column: BBBackend.IAssignment = this.createIAssignment(information);

                resolve(column);
            });
        });
    }

    public createAssignmentAttempt(parameters: BBBackend.CreateAssignmentParameter): Promise<BBBackend.IAssignmentAttempt> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts";
        const formData = new FormData();
        formData.append('attemptInput', parameters.attemptInput);

        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, formData).then((response) => {
                const attempt: any = JSON.parse(response);

                const result: BBBackend.IAssignmentAttempt = this.createIAssignmentAttempt(attempt);
                resolve(result);
            });
        });
    }

    public updateAssignmentAttempt(parameters: BBBackend.UpdateAssignmentParameter): Promise<BBBackend.IAssignmentAttempt> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts/" + parameters.attemptId;
        const formData = new FormData();
        formData.append('attemptInput', parameters.attemptInput);

        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, formData).then((response) => {
                const attempt: any = JSON.parse(response);

                const result: BBBackend.IAssignmentAttempt = this.createIAssignmentAttempt(attempt);
                resolve(result);
            });
        });
    }

    public getAssignmentAttempt(parameters: BBBackend.AssignmentID): Promise<BBBackend.IAssignmentAttempt> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts/" + parameters.attemptId;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const attempt: any = JSON.parse(response);

                const result: BBBackend.IAssignmentAttempt = this.createIAssignmentAttempt(attempt);
                resolve(result);
            });
        });
    }

    public getAssignmentAttempts(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignmentAttempt[]> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts";
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const attempts: any[] = JSON.parse(response);

                const result: BBBackend.IAssignmentAttempt[] = [];

                for (const attempt of attempts) {
                    result.push(this.createIAssignmentAttempt(attempt));
                }

                resolve(result);
            });
        });
    }

    /**
     * Creates an IAssignmentAttempt from a JSON response.
     *
     * @param {any} information
     */
    private createIAssignmentAttempt(information: any): BBBackend.IAssignmentAttempt {
        return {
            created: information.created,
            feedback: information.feedback,
            groupAttemptId: information.groupAttemptId,
            id: information.id,
            notes: information.notes,
            score: information.score,
            status: information.status,
            studentComments: information.studentComments,
            studentSubmission: information.studentSubmission,
            text: information.text,
            userId: information.userId
        };
    }

    /**
     * Creates an IAssignment from a JSON response.
     *
     * @param {any} information
     */
    private createIAssignment(information: any): BBBackend.IAssignment {
        return {
            attemptsAllowed: information.grading.attemptsAllowed,
            available: Utilities.stringToBoolean(information.availability.available),
            contentId: information.contentId,
            desc: information.description,
            due: information.grading.due,
            id: information.id,
            name: information.name,
            score: information.score.possible
        };
    }
}
