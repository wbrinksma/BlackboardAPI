import {BBBackend} from "../../@types/BBBackend";
import { BBIframeBackend } from "..";
import Files from "../../common/BBAbstractBackend/files";

export default class BBFiles extends Files {

  private backend: BBIframeBackend 
  private category: string
  constructor(category:string, backend: BBIframeBackend) {
      super()
      this.backend = backend;
      this.category = category
  }

  public getFileInfo(parameters: BBBackend.CourseID): Promise<BBBackend.IFileInfo> {
    return this.backend.sendMessageThroughConnectionManager(this.category,"getFileInfo", parameters);
  }
  public setFileBody(parameters: BBBackend.FileBodyParameter): Promise<BBBackend.ITaskComplete> {
      return this.backend.sendMessageThroughConnectionManager(this.category,"setFileBody", parameters);
  }
  public createFolder(parameters: BBBackend.CreateFolderParameter): Promise<BBBackend.ITaskComplete> {
    return this.backend.sendMessageThroughConnectionManager(this.category,"createFolder", parameters);
  }

  
}
