/**
 * A class containing functions for submitting and reviewing assignments.
 * @memberof BBBackend
 */
export default abstract class Assignments {
  /**
   * Submit an HTML document as submission for specified assignment.
   * @param parameters An object containing submission and necessary data to deduce an assignment reference.
   * @returns A promise with an indication wether the submission has been submitted.
   */
  public abstract submit(parameters: BBBackend.AssignmentParameter): Promise<BBBackend.ITaskComplete>;
}
