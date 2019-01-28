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
     * Create a folder in the content management system
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract createFolder(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete>;

    /**
     * Delete a file or folder in the content management system
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract deleteFile(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete>;

    /**
     * Download a file or folder in the content management system
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract downloadFile(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete>;

    /**
     * Publish a file in the content management system
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract publishFile(parameters: BBBackend.FileAttachmentParameter): Promise<BBBackend.ITaskComplete>;

    /**
     * Set permisions of a file in the content management system
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract setPermissions(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete>;
}
