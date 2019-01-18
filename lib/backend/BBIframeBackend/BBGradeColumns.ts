import { BBIframeBackend } from "..";
import GradeColumns from '../../common/BBAbstractBackend/gradeColumns';

export default class BBGradeColumns extends GradeColumns {

    private backend: BBIframeBackend;
    private category: string;

    constructor(category: string, backend: BBIframeBackend) {
        super();
        this.backend = backend;
        this.category = category;
    }

    public getAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignment> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getAssignmentCol", parameters);
    }

    public deleteAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.ITaskComplete> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "deleteAssignmentCol", parameters);
    }

    public createAssignmentCol(parameters: BBBackend.CreateColParameter): Promise<BBBackend.IAssignment> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "createAssignmentCol", parameters);
    }

    public updateAssignmentCol(parameters: BBBackend.UpdateColParameter): Promise<BBBackend.IAssignment> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "updateAssignmentCol", parameters);
    }

    public createAssignmentAttempt(parameters: BBBackend.CreateAssignmentParameter): Promise<BBBackend.IAssignmentAttempt> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "createAssignmentAttempt", parameters);
    }

    public updateAssignmentAttempt(parameters: BBBackend.UpdateAssignmentParameter): Promise<BBBackend.IAssignmentAttempt> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "updateAssignmentAttempt", parameters);
    }

    public getAssignmentAttempt(parameters: BBBackend.AssignmentID): Promise<BBBackend.IAssignmentAttempt> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getAssignmentAttempt", parameters);
    }

    public getAssignmentAttempts(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignmentAttempt[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getAssignmentAttempts", parameters);
    }

    public getAssignmentCols(parameters: BBBackend.CourseID): Promise<BBBackend.IAssignment[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getAssignmentCols", parameters);
    }

    public addFileToAssignmentAttempt(parameters: BBBackend.AssignmentAttemptParameter): Promise<BBBackend.IAssignmentAttemptFile> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "addFileToAssignmentAttempt", parameters);
    }

    public deleteFileFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFileParameter): Promise<BBBackend.ITaskComplete> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "deleteFileFromAssignmentAttempt", parameters);
    }

    public downloadFileFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFileParameter): Promise<File> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "downloadFileFromAssignmentAttempt", parameters);
    }

    public getFileFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFileParameter): Promise<BBBackend.IAssignmentAttemptFile> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getFileFromAssignmentAttempt", parameters);
    }

    public getFilesFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFilesParameter): Promise<BBBackend.IAssignmentAttemptFile[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getFilesFromAssignmentAttempt", parameters);
    }
}
