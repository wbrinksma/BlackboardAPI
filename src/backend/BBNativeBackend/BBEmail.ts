import { BBBackend, HTTPRequest } from '../../common';
import Email from '../../common/BBBackend/email';

export default class BBEmail extends Email {
  public sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.ITaskComplete> {
      throw new Error("Method not implemented.");
  }
}
