/**
 * A class containing all function to interact with a course's file system.
 * @memberof BBAbstractBackend
 */
export default abstract class Files {
    /**
     * Get info about a file or item inside the course's public file system.
     * @param parameters The parameters to use with this function.
     * @returns A promise with info about the selected file.
     */
    public abstract getFileInfo(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.IFileInfo>;

    /**
     * Set the body of a public file in the course's public file system.
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.ITaskComplete>;

    /**
     * Create a folder in the content management system.
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract createFolder(parameters: BBBackend.CreateFolderParameter): Promise<BBBackend.ITaskComplete>;

    /**
     * Upload a file to Blackboard's temporary storage.
     * The returned id is used in other parts of Blackboard to refer to the file.
     * @param parameters The parameters to use with this function.
     * @returns A promise with the id of the uploaded file to use in other parts of Blackboard.
     */
    public abstract uploadFile(parameters: BBBackend.FileUpload): Promise<BBBackend.FileId>;
}
