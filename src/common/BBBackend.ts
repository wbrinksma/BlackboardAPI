/**
 * Abstract class which specifies the entry point of the API. This contains
 * all function declarations that communicate with Blackboard.
 */
abstract class BBBackend {
    /**
     * Get the current domain to use in urls
     * @returns {string}
     */
    public abstract getBlackboardDomain() : string;

    /**
     * Get courses the user is enrolled.
     * @param The parameters to use with this function.
     * @returns A promise with an array of courses the user is enrolled in.
     */
    public abstract getEnrolledCourses(parameters : BBBackend.EnrolledCoursesParameter) : Promise<BBBackend.CourseInformation[]>;

    /**
     * Get information about a course.
     * @param parameters The parameters to use with this function.
     * @returns A promise with information about the selected course.
     */
    public abstract getCourseInformation(parameters : BBBackend.CourseIdParameter) : Promise<BBBackend.CourseInformation>;

    /**
     * Use this function to send an email to one or more recipients. Be aware that the sender will also receive
     * a copy of the email. You can only send email through a course and its users.
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract sendMail(parameters : BBBackend.SendMailParameter) : Promise<BBBackend.TaskComplete>;

    /**
     * Get info about a file or item inside the course's public file system.
     * @param parameters The parameters to use with this function.
     * @returns A promise with info about the selected file.
     */
    public abstract getFileInfo(parameters : BBBackend.FileInfoParameter) : Promise<BBBackend.FileInfo>;

    /**
     * Set the body of a public file in the course's public file system.
     * @param parameters The parameters to use with this function.
     * @returns A promise which indicates when the task is complete.
     */
    public abstract setFileBody(parameters : BBBackend.FileBodyParameter) : Promise<BBBackend.TaskComplete>;
}

/**
 * Namespace to hold all general type information
 */
namespace BBBackend {
    export type UserID = { "userId": string};
    export type EnrolledCoursesParameter = UserID & {"offset": number};

    export type CourseIdParameter = {"courseId": string};

    export type SendMailParameter = CourseIdParameter & {"recipientIds": string[], "subject": string, "body": string};

    export type FileInfoParameter = CourseIdParameter & {};

    export type FileBodyParameter = FileInfoParameter & {"body": string};

    export interface UserInformation {
        readonly firstName : string;
        readonly lastName : string; 
    }

    export interface CourseInformation {
        readonly id : string;
    }

    export interface FileInfo {

    }

    export interface TaskComplete {
    }
}