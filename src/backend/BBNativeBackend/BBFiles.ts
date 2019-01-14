import { HTTPRequest, Utilities } from '../../common';
import Files from '../../common/BBAbstractBackend/files';

export default class BBFiles extends Files {
    public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
      throw new Error("Method not implemented.");
    }
    public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.ITaskComplete> {
      throw new Error("Method not implemented.");
    }
    public createFolder(parameters: BBBackend.FolderParameter): Promise<BBBackend.ITaskComplete> {
        return new Promise((resolve, reject) => {
            let uniqPath: string = "/webapps/cmsmain/webui/courses/"+parameters.courseId+"?action=frameset&subaction=view&course_id=" + parameters.id
            HTTPRequest.getAsync(uniqPath).then( (response) => {
                let parser: DOMParser = new DOMParser();
                let dom: HTMLDocument = parser.parseFromString(response, 'text/html') as HTMLDocument;
                let uniqDiv = dom.getElementById("addFolderForm") as HTMLDivElement;
                let uniqForm = uniqDiv.firstElementChild as HTMLFormElement;
                let uniqExpr = /uniq=(.*)&c/g
                let uniq = uniqExpr.exec(uniqForm.action)[1]

                let nonceExpr = /nonce=(.*)/g
                let nonce = nonceExpr.exec(uniqForm.action)[1]

                let path: string = "/webapps/cmsmain/webui/courses/" + parameters.courseId + "?action=upload&subaction=createdirectory&uniq=" + uniq + "&course_id=" + parameters.id + "&blackboard.platform.security.NonceUtil.nonce=" + nonce;
                HTTPRequest.postAsync(path, 'NEWDIR1='+parameters.folderName, 'form');
            });
        });
    }
    public deleteFolder(parameters: BBBackend.FolderParameter): Promise<BBBackend.ITaskComplete>{
        return new Promise((resolve, reject) => {
        let path = "/webapps/cmsmain/webui/courses/" + parameters.courseId

        let noncePath = "/webapps/cmsmain/webui/courses/" + parameters.courseId + "?action=frameset&subaction=view&course_id=" + parameters.id
        HTTPRequest.getAsync(noncePath).then( (response) => {
            let parser: DOMParser = new DOMParser();
            let dom: HTMLDocument = parser.parseFromString(response, 'text/html') as HTMLDocument;
            let nonceForm = dom.getElementById("filesForm") as HTMLFormElement;
            let nonceInput = nonceForm.children[0] as HTMLInputElement;
            HTTPRequest.postAsync(path, "blackboard.platform.security.NonceUtil.nonce="+nonceInput.value+"&a1=multiple&subaction=delete&course_id="+parameters.id+"&restore_trash=false&webuipath=%2Fwebapps%2Fcmsmain%2Fwebui&selectAllFromList=false&file0=%2Fcourses%2F"+parameters.courseId+"%2F"+parameters.folderName, 'form');
        });
        })
    }
}