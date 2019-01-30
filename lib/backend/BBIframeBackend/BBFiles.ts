import {BBIframeBackend} from "..";
import Files from "../../common/BBAbstractBackend/files";

export default class BBFiles extends Files {
    private backend: BBIframeBackend;
    private category: string;

    constructor(category: string, backend: BBIframeBackend) {
        super();
        this.backend = backend;
        this.category = category;
    }

    public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getFileInfo", parameters);
    }

    public createFolder(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete> {
        return this.backend.sendMessageThroughConnectionManager( this.category, "createFolder", parameters );
    }

    public deleteFile(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete> {
        return this.backend.sendMessageThroughConnectionManager( this.category, "deleteFile", parameters );
    }

    public downloadFile(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete> {
        return this.backend.sendMessageThroughConnectionManager( this.category, "downloadFile", parameters );
    }

    public publishFile(parameters: BBBackend.FileAttachmentParameter): Promise<BBBackend.ITaskComplete> {
        return this.backend.sendMessageThroughConnectionManager( this.category, "publishFile", parameters );
    }

    public setPermissions(parameters: BBBackend.FilePermissions): Promise<BBBackend.ITaskComplete> {
        return this.backend.sendMessageThroughConnectionManager( this.category, "setPermissions", parameters)
    }

    public uploadFile(parameters: BBBackend.FileUpload): Promise<BBBackend.FileId> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "uploadFile", parameters);
    }
}
