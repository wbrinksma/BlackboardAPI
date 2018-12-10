import {BBBackend} from "../../@types/BBBackend";

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
}
