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

  /**
   * Get all assignments from a specified course.
   * @param parameters The parameters to use with this function.
   * @returns A promise containing an array of assignments.
   */
   public abstract getAssignments(parameters: BBBackend.CourseID): Promise<BBBackend.IAssignment[]>;
}
