import { BBBackend, HTTPRequest } from '../../common';
import Files from '../../common/BBBackend/files';

export default class BBFiles extends Files {
  public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
      throw new Error("Method not implemented.");
  }
  public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.ITaskComplete> {
      throw new Error("Method not implemented.");
  }
}
