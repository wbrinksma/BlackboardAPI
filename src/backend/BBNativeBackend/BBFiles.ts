import {BBBackend} from "../../@types/BBBackend";
import Files from '../../common/BBAbstractBackend/files';

export default class BBFiles extends Files {
  public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
      throw new Error("Method not implemented.");
  }
  public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.ITaskComplete> {
      throw new Error("Method not implemented.");
  }
}
