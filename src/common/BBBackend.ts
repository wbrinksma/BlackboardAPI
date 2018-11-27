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
    public abstract getCourse(parameters: BBBackend.CourseID):
        Promise<BBBackend.ICourseInformation>;

    /**
     * Create a new course.
     * @returns A response.
     */
    public abstract postCourse():
        Promise<string>;

    /**
     * Delete a course.
     * @param parameters The parameters to use with this function.
     * @returns A response.
     */
    public abstract deleteCourse(parameters: BBBackend.CourseID):
        Promise<string>;

    /**
     * Patch a course.
     * @param parameters The parameters to use with this function.
     * @returns A promise with information about the selected course.
     */
    public abstract patchCourse(parameters: BBBackend.CourseID):
        Promise<string>;

    /**
     * Get contents of a course.
     * @param parameters The parameters to use with this function.
     * @returns A promise with contents of the selected course.
     */
    public abstract getCourseContents(parameters: BBBackend.CourseID):
    Promise<BBBackend.ICourseContent[]>;

    /**
     * Get a content of a course.
     * @param parameters The parameters to use with this function.
     * @returns A promise with the content of the selected course.
     */
    public abstract getCourseContent(parameters: BBBackend.CourseID):
    Promise<BBBackend.ICourseContent>;


    /**
     * Create new course content.
     * @param parameters The parameters to use with this function.
     * @returns A response.
     */
    public abstract postCourseContent(parameters: BBBackend.CourseID):
        Promise<string>;

    /**
     * Delete course content.
     * @param parameters The parameters to use with this function.
     * @returns A response.
     */
    public abstract deleteCourseContent(parameters: BBBackend.CourseContentParameter):
    Promise<string>;

    /**
     * Patch course content.
     * @param parameters The parameters to use with this function.
     * @returns A response.
     */
    public abstract patchCourseContent(parameters: BBBackend.CourseContentParameter):
    Promise<string>;

    /**
     * Get children of course content.
     * @param parameters The parameters to use with this function.
     * @returns A promise with children of the selected course.
     */
    public abstract getCourseContentChildren(parameters: BBBackend.CourseContentParameter):
    Promise<BBBackend.ICourseContent[]>;

    /**
     * Get children of a course.
     * @param parameters The parameters to use with this function.
     * @returns A promise with children of the selected course.
     */
    public abstract getCourseChildren(parameters: BBBackend.CourseID):
    Promise<BBBackend.ICourseChild[]>;

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
