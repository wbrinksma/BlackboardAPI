import { BBIframeBackend } from "..";
import Courses from '../../common/BBAbstractBackend/courses';

export default class BBCourses extends Courses {

    private backend: BBIframeBackend;
    private category: string;

    constructor(category: string, backend: BBIframeBackend) {
        super();
        this.backend = backend;
        this.category = category;
    }

    public getEnrolledCourses(parameters: BBBackend.EnrolledCoursesParameter): Promise<BBBackend.ICourseInformation[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getEnrolledCourses", parameters);
    }

    public getCourseInformation(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseInformation> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseInformation", parameters);
    }

    public postCourse(): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "postCourse");
    }

    public deleteCourse(parameters: BBBackend.CourseID): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "deleteCourse", parameters);
    }

    public patchCourse(parameters: BBBackend.CourseID): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "patchCourse", parameters);
    }

    public getCourseContents(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseContent[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseContents", parameters);
    }

    public getCourseContent(parameters: BBBackend.CourseContentParameter): Promise<BBBackend.ICourseContent> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseContent", parameters);
    }

    public getCourseContentChildren(parameters: BBBackend.CourseContentParameter): Promise<BBBackend.ICourseContent[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseContentChildren", parameters);
    }

    public postCourseContent(parameters: BBBackend.CourseID): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "postCourseContent", parameters);
    }

    public postCourseContentChildren(parameters: BBBackend.CourseContentParameter): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "postCourseContentChildren", parameters);
    }

    public deleteCourseContent(parameters: BBBackend.CourseContentParameter): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "deleteCourseContent", parameters);
    }

    public patchCourseContent(parameters: BBBackend.CourseContentParameter): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "patchCourseContent", parameters);
    }

    public getCourseChildren(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseChild[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseChildren", parameters);
    }

    public getAssignmentCols(parameters: BBBackend.CourseID): Promise<BBBackend.IAssignment[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getAssignmentCols", parameters);
    }
}
