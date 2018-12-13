import {BBBackend} from "../../@types/BBBackend";

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
}
