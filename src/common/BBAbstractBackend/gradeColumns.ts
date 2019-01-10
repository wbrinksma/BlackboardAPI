/**
 * A class containing all grade-related functions from the teacher's view.
 * This only includes the functions about the assignments themselves.
 * For more specific parts of the grade center, see the grade attempts, users
 * and schemas.
 * @memberof BBAbstractBackend
 */
export default abstract class GradeColumns {
  /**
   * Get a specific assignment column.
   * @param parameters A combination of course ID and column ID.
   * @returns A promise with an assignment column.
   */
    public abstract getAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignment>;

  /**
   * Delete an assignment column.
   * @param parameters A combination of course ID and column ID.
   * @returns A promise that indicates wether the deletion succeeded.
   */
    public abstract deleteAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.ITaskComplete>;

  /**
   * Update an assignment column.
   * @param parameters The parameters used in this function.
   * @see {@link docs/column_example.md|docs/column_example.md} for an example of a config body.
   * @returns A promise with the updated assignment column.
   */
    public abstract updateAssignmentCol(parameters: BBBackend.UpdateColParameter): Promise<BBBackend.IAssignment>;
}
