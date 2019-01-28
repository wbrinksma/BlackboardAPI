import { HTTPRequest, Utilities } from '../../common';
import Files from '../../common/BBAbstractBackend/files';

export default class BBFiles extends Files {
    public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
      throw new Error("Method not implemented.");
    }
    public createFolder(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete> {
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
                HTTPRequest.postAsync(path, 'NEWDIR1='+parameters.name, 'form');
            });
        });
    }

    private fileAction(parameters: BBBackend.FileInfoParameter, a1:string, action: string): Promise<BBBackend.ITaskComplete>{
        return new Promise((resolve, reject) => {
        let path = "/webapps/cmsmain/webui/courses/" + parameters.courseId
        if(action == 'zip') path += '.zip'

        let noncePath = "/webapps/cmsmain/webui/courses/" + parameters.courseId + "?action=frameset&subaction=view&course_id=" + parameters.id
        HTTPRequest.getAsync(noncePath).then( (response) => {
            let parser: DOMParser = new DOMParser();
            let dom: HTMLDocument = parser.parseFromString(response, 'text/html') as HTMLDocument;
            let nonceForm = dom.getElementById("filesForm") as HTMLFormElement;
            let nonceInput = nonceForm.children[0] as HTMLInputElement;
            HTTPRequest.postAsync(path, "blackboard.platform.security.NonceUtil.nonce="+nonceInput.value+"&a1="+a1+"&subaction="+action+"&course_id="+parameters.id+"&restore_trash=false&webuipath=%2Fwebapps%2Fcmsmain%2Fwebui&selectAllFromList=false&file0=%2Fcourses%2F"+parameters.courseId+"%2F"+parameters.name, 'form');
        });
        })
    }

    public publishFile(parameters: BBBackend.FileAttachmentParameter): Promise<BBBackend.ITaskComplete>{
        return new Promise((resolve, reject) => {
            const path = "/webapps/cmsmain/webui/courses/"+parameters.courseId+"?action=upload&subaction=uploadFiles&uniq=9szxf3&gobackto=%2Fcourses%2F"+parameters.courseId
            
            HTTPRequest.getAsync(path).then( (response) => {
                let parser: DOMParser = new DOMParser();
                let dom: HTMLDocument = parser.parseFromString(response, 'text/html') as HTMLDocument;
                let form = dom.getElementsByName("fileUpload")[0] as HTMLFormElement;
                let formData: FormData = new FormData();
                const securityNonce: string = Utilities.getNonceFromForm(dom, 'fileUpload');
                formData.append('blackboard.platform.security.NonceUtil.nonce', securityNonce);
                formData.append('targetPath', '/courses/'+parameters.courseId)
                formData.append('view','')
                formData.append('isLightbox', 'false')
                formData.append('newFile_attachmentType', 'L')
                formData.append('newFile_artifactFileId', undefined)
                formData.append('newFile_artifactType', undefined)
                formData.append('newFile_artifactTypeResourceKey',undefined)
                formData.append('newFile_linkTitle', parameters.name)
                formData.append('updateCommentType', 'updateCommentType')
                formData.append('updateVersionsSetting', 'updateVersionsSetting')
                formData.append('updateTrackingSetting', 'updateTrackingSetting')
                formData.append('newFilefilePickerLastInput', 'dummyValue')
                formData.append('newFile_LocalFile0', parameters.body)
                HTTPRequest.postAsync(form.action+"&course_id="+parameters.id, formData);
            });
        })
    }

    public deleteFile(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete>{
        return this.fileAction(parameters,'multiple','delete')
    }

    public downloadFile(parameters: BBBackend.FileInfoParameter): Promise<BBBackend.ITaskComplete>{
        return this.fileAction(parameters,'download','zip')
    }

    public setPermissions(parameters: BBBackend.FilePermissions): Promise<BBBackend.ITaskComplete>{
        return new Promise((resolve, reject) => {
            const path = "/webapps/cmsmain/webui/courses/"+parameters.courseId+"/"+parameters.name+"?action=permissions&subaction=printfindcourseuserlist&uniq=uz57o3&gobackto=dirList-&course_id="+parameters.id
            HTTPRequest.getAsync(path).then( (response) => {
                let parser: DOMParser = new DOMParser();
                let dom: HTMLDocument = parser.parseFromString(response, 'text/html') as HTMLDocument;
                let form = dom.getElementsByName("addUserListForm")[0] as HTMLFormElement;
                let formString: string = '';
                const securityNonce: string = Utilities.getNonceFromForm(dom, 'addUserListForm');
                formString += 'blackboard.platform.security.NonceUtil.nonce=' + securityNonce;
                formString += '&course_ids=' + parameters.courseId
                formString += '&bAllowEveryone=' + parameters.bAllowEveryone
                formString += '&B=' + parameters.B
                formString += '&G=' + parameters.G
                formString += '&P=' + parameters.P
                formString += '&S=' + parameters.S
                formString += '&T=' + parameters.T
                formString += '&U=' + parameters.U
                formString += '&bAllowRead=' + parameters.bAllowRead
                formString += '&bAllowWrite=' + parameters.bAllowWrite
                formString += '&bAllowDelete=' + parameters.bAllowDelete
                formString += '&bAllowManage=' + parameters.bAllowManage
                formString += '&bottom_Submit=' + 'Submit'
                HTTPRequest.postAsync(form.action, formString, 'form');
            });
        })
    }
}