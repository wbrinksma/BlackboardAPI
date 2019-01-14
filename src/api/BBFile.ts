import Backend from "./Backend";
import BBCourse from "./BBCourse";

export default class BBFile {
    private _course: BBCourse;

    constructor(course: BBCourse) {
        this._course = course;
        console.log(this.createFolder);
    }

    public createFolder(name): Promise<BBBackend.ITaskComplete> {
        return new Promise((resolve, reject) => {
        this._course.getCourseInformation().then((information) => {
            const parameters: BBBackend.FolderParameter = {
                id: information.id,
                courseId: information.courseId,
                folderName: name
            };

            resolve(Backend.getBackend().files.createFolder(parameters));
        });
     });
    }

    public deleteFolder(name): Promise<BBBackend.ITaskComplete> {
        return new Promise((resolve, reject) => {
        this._course.getCourseInformation().then((information) => {
            const parameters: BBBackend.FolderParameter = {
                id: information.id,
                courseId: information.courseId,
                folderName: name
            };

            resolve(Backend.getBackend().files.deleteFolder(parameters));
        });
     });
    }

}
