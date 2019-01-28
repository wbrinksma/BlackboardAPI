import Backend from "./Backend";
import BBCourse from "./BBCourse";

export default class BBFile {
    private _course: BBCourse;
    private _name: string;
    private _body: Blob;
    private _permissions: BBBackend.FilePermissions

    constructor(course: BBCourse, name: string) {
        this._course = course;
        this._name = name;
    }

    public setBody(body: Blob) {
        this._body = body;
    }

    public createFolder(): Promise<BBBackend.ITaskComplete> {
        return new Promise((resolve, reject) => {
        this._course.getCourseInformation().then((information) => {
            const parameters: BBBackend.FileInfoParameter = {
                id: information.id,
                courseId: information.courseId,
                name: this._name
            };

            resolve(Backend.getBackend().files.createFolder(parameters));
        });
     });
    }

    public deleteFile(): Promise<BBBackend.ITaskComplete> {
        return new Promise((resolve, reject) => {
        this._course.getCourseInformation().then((information) => {
            const parameters: BBBackend.FileInfoParameter = {
                id: information.id,
                courseId: information.courseId,
                name: this._name
            };

            resolve(Backend.getBackend().files.deleteFile(parameters));
        });
     });
    }

    public downloadFile(): Promise<BBBackend.ITaskComplete> {
        return new Promise((resolve, reject) => {
        this._course.getCourseInformation().then((information) => {
            const parameters: BBBackend.FileInfoParameter = {
                id: information.id,
                courseId: information.courseId,
                name: this._name
            };

            resolve(Backend.getBackend().files.downloadFile(parameters));
        });
     });
    }

    public publishFile(): Promise<BBBackend.ITaskComplete> {
        return new Promise((resolve, reject) => {
            this._course.getCourseInformation().then((information) => {
                const parameters: BBBackend.FileAttachmentParameter = {
                    courseId: information.courseId,
                    id: information.id,
                    name: this._name,
                    body: this._body
                };
    
                resolve(Backend.getBackend().files.publishFile(parameters));
            });
         });
    }

    public setPermissions(permissions: BBBackend.FilePermissions = null): Promise<BBBackend.ITaskComplete> {
        if(permissions !== null) this._permissions = permissions
        return new Promise((resolve, reject) => {
            this._course.getCourseInformation().then((information) => {
                const parameters: BBBackend.FilePermissions = {
                    courseId: information.courseId,
                    id: information.id,
                    name: this._name,
                    bAllowEveryone: this._permissions.bAllowEveryone,
                    B: this._permissions.B,
                    G: this._permissions.G,
                    P: this._permissions.P,
                    S: this._permissions.S,
                    T: this._permissions.T,
                    U: this._permissions.U,
                    bAllowRead: this._permissions.bAllowRead,
                    bAllowWrite: this._permissions.bAllowWrite,
                    bAllowDelete: this._permissions.bAllowDelete,
                    bAllowManage: this._permissions.bAllowManage
                };

                resolve(Backend.getBackend().files.setPermissions(parameters));
            });
         });
    }

}
