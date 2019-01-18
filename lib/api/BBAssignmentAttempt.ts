import Backend from './Backend';

export default class BBAssignmentAttempt {
    private readonly _courseId: string;
    private readonly _columnId: string;
    private readonly _assignmentId: string;
    private assignmentInformation: BBBackend.IAssignmentAttempt;
    private files: BBBackend.IAssignmentAttemptFile[];

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

    public getAssociatedFiles(): Promise<BBBackend.IAssignmentAttemptFile[]> {
        return new Promise((resolve, reject) => {
           if (this.files) {
               resolve(this.files);
               return;
           }

           this.getAttemptInformation().then((attemptInformation) => {
               const parameters: BBBackend.AssignmentAttemptFilesParameter = {
                   attemptId: attemptInformation.id,
                   courseId: this._courseId
               };

               return Backend.getBackend().gradeColumns.getFilesFromAssignmentAttempt(parameters);
           }).then((information) => {
               this.files = information;
               resolve(this.files);
           });
        });
    }

    public attachFile(file: File): Promise<BBBackend.IAssignmentAttemptFile> {
        return new Promise((resolve, reject) => {
            const uploadParameters: BBBackend.FileUpload = {
                file: file
            };

            Promise.all([
                this.getAttemptInformation(),
                Backend.getBackend().files.uploadFile(uploadParameters)
            ]).then((responses) => {
                const attemptInformation: BBBackend.IAssignmentAttempt = responses[0];
                const uploadInformation: BBBackend.FileId = responses[1];

                const attachmentParameters: BBBackend.AssignmentAttemptParameter = {
                    attemptId: attemptInformation.id,
                    courseId: this._courseId,
                    fileId: uploadInformation.id
                };

                return Backend.getBackend().gradeColumns.addFileToAssignmentAttempt(attachmentParameters);
            }).then((information) => {
                resolve(information);
            });
        });
    }

    public removeFile(fileId: string): Promise<BBBackend.ITaskComplete> {
        return new Promise((resolve, reject) => {
            this.getAttemptInformation().then((attemptInformation) => {
                const parameters: BBBackend.AssignmentAttemptFileParameter = {
                    attemptFileId: fileId,
                    attemptId: attemptInformation.id,
                    courseId: this._courseId
                };

                return Backend.getBackend().gradeColumns.deleteFileFromAssignmentAttempt(parameters);
            }).then((information) => {
                resolve(information);
            });
        });
    }
}
