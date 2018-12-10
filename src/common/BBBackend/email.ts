/**
 * A class containing all functions related to e-mailing.
 * @memberof BBBackend
 */
export default abstract class Email {
  /**
   * Use this function to send an email to one or more recipients. Be aware that the sender will also receive
   * a copy of the email. You can only send email through a course and its users.
   * @param parameters The parameters to use with this function.
   * @returns A promise which indicates when the task is complete.
   */
  public abstract sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.ITaskComplete>;
}
