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
     * Retrieve a list of assignment attempts.
     * @param parameters A combination of course ID and column ID.
     * @return A promise with a list of assignment attempts.
     */
    public abstract getAssignmentAttempts(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignmentAttempt[]>;

    /**
     * Retrieve a list of files associated with the assignment attempt.
     * @param parameters A combination of course ID and Assignment attempt ID.
     * @return A promise with the files associated with the assignment attempt.
     */
    public abstract getFilesFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFilesParameter): Promise<BBBackend.IAssignmentAttemptFile[]>;

    /**
     * Remove a file from an assignment attempt.
     * @param parameters A combination of course ID, Assignment attempt ID and the file ID.
     * @return A promise that indicates whether the deletion succeeded.
     */
    public abstract deleteFileFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFileParameter): Promise<BBBackend.ITaskComplete>;

    /**
     * Retrieve information about a file associated with an assignment attempt.
     * @param parameters A combination of course ID, Assignment attempt ID and the file ID.
     * @return A promise with information about the file.
     */
    public abstract getFileFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFileParameter): Promise<BBBackend.IAssignmentAttemptFile>;

    /**
     * Download a file from an assignment attempt.
     * @param parameters A combination of course ID, Assignment attempt ID and the file ID.
     * @returns A promise with the file.
     */
    public abstract downloadFileFromAssignmentAttempt(parameters: BBBackend.AssignmentAttemptFileParameter): Promise<File>;

    /**
     * Add a file to an assignment attempt.
     * @param parameters A combination of course ID, Assignment attempt ID and the ID of a recently uploaded file.
     * @see {@link docs/uploads.md|docs/uploads.md}
     * @returns A promise with information about the added file.
     */
    public abstract addFileToAssignmentAttempt(parameters: BBBackend.AssignmentAttemptParameter): Promise<BBBackend.IAssignmentAttemptFile>;

    /**
     * Retrieve the score for a particular user.
     * @param parameters A combination for the course ID and the User ID.
     * @returns A promise with information about all grades for the given course.
     */
    public abstract getUserGrades(parameters: BBBackend.UserGradesParameter): Promise<BBBackend.IGrade[]>;
}
