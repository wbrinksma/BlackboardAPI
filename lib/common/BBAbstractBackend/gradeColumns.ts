/**
 * A class containing all grade-related functions from the teacher's view.
 * This only includes the functions about the assignments themselves.
 * For more specific parts of the grade center, see the grade attempts, users
 * and schemas.
 * @memberof BBAbstractBackend
 */
export default abstract class GradeColumns {
    /**
     * Get all assignment columns from a specified course.
     * @param parameters The parameters to use with this function.
     * @returns A promise containing an array of assignment columns.
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
     * Create a new assignment column.
     * @param parameters The parameters to use with this function, including a config body.
     * A config body is a string containing a JSON with info on how the column should look like.
     * @see {@link docs/column_example.md|docs/column_example.md} for an example of a config body.
     * @returns A promise containing the newly created assignment column.
     */
    public abstract createAssignmentCol(parameters: BBBackend.CreateColParameter): Promise<BBBackend.IAssignment>;

    /**
     * Update an assignment column.
     * @param parameters The parameters used in this function.
     * @see {@link docs/column_example.md|docs/column_example.md} for an example of a config body.
     * @returns A promise with the updated assignment column.
     */
    public abstract updateAssignmentCol(parameters: BBBackend.UpdateColParameter): Promise<BBBackend.IAssignment>;

    /**
     * Create a new assignment attempt.
     * @param parameters The parameters used in this function.
     * @returns A promise with the information of the newly created assignment attempt.
     */
    public abstract createAssignmentAttempt(parameters: BBBackend.CreateAssignmentParameter): Promise<BBBackend.IAssignmentAttempt>;

    /**
     * Update an assignment attempt.
     * @param parameters The parameters used in this function.
     * @returns A promise with the updated assignment attempt.
     */
    public abstract updateAssignmentAttempt(parameters: BBBackend.UpdateAssignmentParameter): Promise<BBBackend.IAssignmentAttempt>;

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
