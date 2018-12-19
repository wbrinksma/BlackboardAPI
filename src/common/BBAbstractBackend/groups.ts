/**
 * A class that contains all Group-related functions.
 * @memberof BBAbstractBackend
 */
export default abstract class Groups {
    /**
     * Get all groups from a specific course.
     * @param parameters The parameters to use with this function.
     * @returns A promise with an array of groups.
     */
    public abstract getGroups(parameters: BBBackend.CourseID): Promise<BBBackend.IGroup[]>;
}
