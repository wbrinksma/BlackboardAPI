/* tslint:disable:max-line-length */

import { HTTPRequest, Utilities } from '../../common';
import GradeColumns from '../../common/BBAbstractBackend/gradeColumns';

export default class BBGradeColumns extends GradeColumns {
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
        const path = "/webapps/gradebook/do/instructor/deleteItem?course_id=" + parameters.courseId;
        return new Promise((resolve, reject) => {
            Utilities.getNonceFromCourseId(parameters.courseId).then((nonce) => {
                const formData = new FormData();
                formData.append('itemId', parameters.columnId);
                formData.append('blackboard.platform.security.NonceUtil.nonce', nonce);
                HTTPRequest.postAsync(path, formData).then((response) => {
                    const result: BBBackend.ITaskComplete = {success: true};

                    resolve(result);
                });
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
                const attempts: any[] = JSON.parse(response).results;

                const result: BBBackend.IAssignmentAttempt[] = [];

                for (const attempt of attempts) {
                    result.push(this.createIAssignmentAttempt(attempt));
                }

                resolve(result);
            });
        });
    }

    public getFilesFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFilesParameter): Promise<BBBackend.IAssignmentAttemptFile[]> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files";

        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const files: any[] = JSON.parse(response).results;

                const result: BBBackend.IAssignmentAttemptFile[] = [];

                for (const file of files) {
                    result.push(this.createIAssignmentAttemptFile(file));
                }

                resolve(result);
            });
        });
    }

    public deleteFileFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFileParameter): Promise<BBBackend.ITaskComplete> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files/" + parameters.attemptFileId;

        return new Promise((resolve, reject) => {
            HTTPRequest.deleteAsync(path).then((response) => {
                const result: BBBackend.ITaskComplete = {
                    success: true
                };

                resolve(result);
            });
        });
    }

    public getFileFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFileParameter): Promise<BBBackend.IAssignmentAttemptFile> {
        const path: string = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files/" + parameters.attemptFileId;

        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const file: any = JSON.parse(response);

                const result: BBBackend.IAssignmentAttemptFile = this.createIAssignmentAttemptFile(file);

                resolve(result);
            });
        });
    }

    public downloadFileFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFileParameter): Promise<File> {
        const path: string = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files/" + parameters.attemptFileId + "/download";

        return new Promise((resolve, reject) => {
            // To create a File, we need to things; the file information provided by BlackBoard,
            // and the actual file content. Both need to be available when we're creating the
            // File.
            Promise.all( [
                this.getFileFromAssignmentAttempt(parameters),
                HTTPRequest.downloadAsync(path)
            ] ).then((responses: any[]) => {
                const fileInfo: BBBackend.IAssignmentAttemptFile = responses[0];
                const blob: Blob = responses[1];
                const file: File = new File([blob], fileInfo.name);

                resolve(file);
            });
        });
    }

    public addFileToAssignmentAttempt(parameters: BBBackend.AssignmentAttemptParameter): Promise<BBBackend.IAssignmentAttemptFile> {
        const path: string = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files";
        const formData: FormData = new FormData();
        formData.append('attemptFileTOPubV1', parameters.fileId);

        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, formData).then((response) => {
                const file: any = JSON.parse(response);

                const result: BBBackend.IAssignmentAttemptFile = this.createIAssignmentAttemptFile(file);

                resolve(result);
            });
        });
    }

    public getUserGrades(parameters: BBBackend.UserGradesParameter): Promise<BBBackend.IGrade[]> {
        const path: string = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/users/" + parameters.userId;

        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const results: any[] = JSON.parse(response).results;

                const grades: BBBackend.IGrade[] = [];

                for (const result of results) {
                    grades.push({
                        columnId: result.columnId,
                        feedback: result.feedback,
                        notes: result.notes,
                        score: result.score,
                        text: result.text
                    });
                }

                resolve(grades);
            });
        });
    }

    /**
     * Creates an IAssignmentAttemptFile from a JSON response.
     *
     * @param {any} information
     */
    private createIAssignmentAttemptFile(information: any): BBBackend.IAssignmentAttemptFile {
        return {
            id: information.id,
            name: information.name,
            url: information.viewUrl
        };
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
