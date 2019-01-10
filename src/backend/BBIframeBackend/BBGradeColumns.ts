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

    public updateAssignmentCol(parameters: BBBackend.UpdateColParameter): Promise<BBBackend.IAssignment> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "updateAssignmentCol", parameters);
    }
}
