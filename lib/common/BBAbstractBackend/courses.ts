/* tslint:disable:max-line-length */

/**
 * A class containing all course-related functions.
 * @memberof BBAbstractBackend
 */
export default abstract class Courses {
    /**
     * Get courses the user is enrolled.
     * @param parameters The parameters to use with this function.
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
     * Post children of course content.
     * @param parameters The parameters to use with this function.
     * @returns A response.
     */
    public abstract postCourseContentChildren(parameters: BBBackend.CourseContentParameter):
    Promise<string>;
}
