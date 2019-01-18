import Backend from "./Backend";
import BBCourse from "./BBCourse";

export default class BBFile {
    private _course: BBCourse;

    constructor(course: BBCourse) {
        this._course = course;
        console.log(this.createFolder);
    }

    public createFolder(): Promise<BBBackend.ITaskComplete> {
        const parameters: BBBackend.CreateFolderParameter = {
            courseId: this._course.courseId,
            courseName: this._course.courseName,
            folderName: 'Test'
        };

        return Backend.getBackend().files.createFolder(parameters);
    }

}
