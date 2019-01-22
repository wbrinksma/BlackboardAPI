/* tslint:disable:max-line-length */

import { HTTPRequest, Utilities } from '../../common';
import GradeColumns from '../../common/BBAbstractBackend/gradeColumns';

export default class BBGradeColumns extends GradeColumns {
    public getAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignment> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
        return new Promise((resolve, reject) => {
              HTTPRequest.getAsync(path).then((response) => {
                  const column = JSON.parse(response);

                  const result: BBBackend.IAssignment = {
                    available: column.availability.available === 'Yes' ? true : false,
                    contentId: column.contentId,
                    desc: column.description,
                    id: column.id,
                    name: column.name,
                    possibleScore: column.score.possible
                  };

                  resolve(result);
              });
        });
    }

    public deleteAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.ITaskComplete> {
        const path = "https://blackboard.nhlstenden.com/webapps/gradebook/do/instructor/deleteItem?course_id=" + parameters.courseId;
        return new Promise((resolve, reject) => {
            const nonce: string = Utilities.getNonceFromCourseId(parameters.courseId);
            const formData = new FormData();
            formData.append('itemId', parameters.columnId);
            formData.append('blackboard.platform.security.NonceUtil.nonce', nonce);
            HTTPRequest.postAsync(path, formData).then((response) => {
                const result: BBBackend.ITaskComplete = {success: true};

                resolve(result);
            });
        });
    }

    public updateAssignmentCol(parameters: BBBackend.UpdateColParameter): Promise<BBBackend.IAssignment> {
        const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
        const nonce = Utilities.getNonceFromCourseId(parameters.courseId);
        const formData = new FormData();
        formData.append('blackboard.platform.security.NonceUtil.nonce', nonce);
        return new Promise((resolve, reject) => {
            HTTPRequest.patchAsync(path, formData).then((response) => {
                const column = JSON.parse(response);

                const result: BBBackend.IAssignment = {
                    available: column.availability.available === 'Yes' ? true : false,
                    contentId: column.contentId,
                    desc: column.description,
                    id: column.id,
                    name: column.name,
                    possibleScore: column.score.possible
                };

                resolve(result);
            });
        });
    }

    public getAssignmentAttempt(parameters: BBBackend.AssignmentID): Promise<BBBackend.IAssignmentAttempt> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts/" + parameters.attemptId;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const attempt: any = JSON.parse(response);

                const result: BBBackend.IAssignmentAttempt = {
                    created: attempt.created,
                    feedback: attempt.feedback,
                    groupAttemptId: attempt.groupAttemptId,
                    id: attempt.id,
                    notes: attempt.notes,
                    score: attempt.score,
                    studentComments: attempt.studentComments,
                    studentSubmission: attempt.studentSubmission,
                    text: attempt.text,
                    userId: attempt.userId
                };
                resolve(result);
            });
        });
    }

    public getAssignmentAttempts(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignmentAttempt[]> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts";
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const attempts: any[] = JSON.parse(response);

                const result: BBBackend.IAssignmentAttempt[] = [];

                for (const attempt of attempts) {
                    result.push( {
                        created: attempt.created,
                        feedback: attempt.feedback,
                        groupAttemptId: attempt.groupAttemptId,
                        id: attempt.id,
                        notes: attempt.notes,
                        score: attempt.score,
                        studentComments: attempt.studentComments,
                        studentSubmission: attempt.studentSubmission,
                        text: attempt.text,
                        userId: attempt.userId
                    } );
                }

                resolve(result);
            });
        });
    }
}
