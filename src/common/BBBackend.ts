/**
 * Abstract class which specifies the entry point of the API. This contains
 * all function declarations that communicate with Blackboard.
 */
export default abstract class BBBackend {
    /**
     * Get the current domain to use in urls
     * @returns {string}
     */
    public abstract getBlackboardDomain(): string;

    /**
     * Get courses the user is enrolled.
     * @param The parameters to use with this function.
     * @returns A promise with an array of courses the user is enrolled in.
     */
    public abstract getEnrolledCourses(parameters: BBBackend.EnrolledCoursesParameter):
        Promise<BBBackend.ICourseID[]>;

    /**
     * Get information about a course.
     * @param parameters The parameters to use with this function.
     * @returns A promise with information about the selected course.
     */
    public abstract getCourseInformation(parameters: BBBackend.CourseID):
        Promise<BBBackend.ICourseInformation>;

    /**
     * Use this function to send an email to one or more recipients. Be aware that the sender will also receive
     * a copy of the email. You can only send email through a course and its users.
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.ITaskComplete>;

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
     * Get info about a specific user. Use 'BBUserInfo' for a more OOP approach.
     * @param parameters The parameters to use with this function.
     * @returns A promise with the user information of specified username.
     */
    public abstract getUserInfo(parameters: BBBackend.UserParameter): Promise<BBBackend.IUserInfo>;
}
