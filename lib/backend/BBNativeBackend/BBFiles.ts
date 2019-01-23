import { HTTPRequest, Utilities } from '../../common';
import Files from '../../common/BBAbstractBackend/files';

export default class BBFiles extends Files {
  public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
      throw new Error("Method not implemented.");
  }
  public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.ITaskComplete> {
      throw new Error("Method not implemented.");
  }
  public createFolder(parameters: BBBackend.CreateFolderParameter): Promise<BBBackend.ITaskComplete> {
    const nonce: string = Utilities.getNonceFromCourseId(parameters.courseId);
    const path: string = "/webapps/cmsmain/webui/courses/" + parameters.courseName + "?action=upload&subaction=createdirectory&uniq=-50cs4m&course_id=" + parameters.courseId + "&blackboard.platform.security.NonceUtil.nonce=" + nonce;
    return new Promise((resolve, reject) => {
        const formData: FormData = new FormData();
        formData.append('NEWDIR1', parameters.folderName);
        return HTTPRequest.postAsync(path, formData);
    });
}
}