import { BBIframeBackend } from "..";
import Email from "../../common/BBAbstractBackend/email";

export default class BBEmails extends Email {
  private backend: BBIframeBackend;
  private category: string;
  constructor(category: string, backend: BBIframeBackend) {
      super();
      this.backend = backend;
      this.category = category;
  }

  public sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.ITaskComplete> {
    return this.backend.sendMessageThroughConnectionManager(this.category, "sendMail", parameters);
  }
}
