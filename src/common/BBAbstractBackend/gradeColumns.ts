/**
 * A class containing all grade-related functions from the teacher's view.
 * This only includes the functions about the assignments themselves.
 * For more specific parts of the grade center, see the grade attempts, users
 * and schemas.
 * @memberof BBAbstractBackend
 */
export default abstract class GradeColumns {
    /**
     * Retrieve a list of assignment columns.
     *
     * @param parameters The course ID.
     * @return A promise with a list of all assignment columns within the given course.
     */
    public abstract getAssignmentCols(parameters: BBBackend.CourseID): Promise<BBBackend.IAssignment[]>;

    /**
     * Get a specific assignment column.
     * @param parameters A combination of course ID and column ID.
     * @returns A promise with an assignment column.
     */
    public abstract getAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignment>;

    /**
     * Delete an assignment column.
     * @param parameters A combination of course ID and column ID.
     * @returns A promise that indicates whether the deletion succeeded.
     */
    public abstract deleteAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.ITaskComplete>;

    /**
     * Update an assignment column.
     * @param parameters The parameters used in this function.
     * @see {@link docs/column_example.md|docs/column_example.md} for an example of a config body.
     * @returns A promise with the updated assignment column.
     */
    public abstract updateAssignmentCol(parameters: BBBackend.UpdateColParameter): Promise<BBBackend.IAssignment>;

    /**
     * Retrieve a single assignment attempt.
     * @param parameters A combination of course ID, column ID and assignment ID.
     * @return A promise with the requested assignment attempt.
     */
    public abstract getAssignmentAttempt(parameters: BBBackend.AssignmentID): Promise<BBBackend.IAssignmentAttempt>;

    /**
     * Retrieve a list ofe assignment attempts.
     * @param parameters A combination of course ID and column ID.
     * @return A promise with a list of assignment attempts.
     */
    public abstract getAssignmentAttempts(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignmentAttempt[]>;
}
