/**
 * A class that contains all the user-specific functions.
 * @memberof BBAbstractBackend
 */
export default abstract class Users {
    /**
     * Get info about a specific user. Use 'BBUserInfo' for a more OOP approach.
     * @param parameters The parameters to use with this function.
     * @returns A promise with the user information of specified username.
     */
    public abstract getUserInfo(parameters: BBBackend.UserParameter): Promise<BBBackend.IUserInfo>;
    public abstract getCurrentUserId(parameters: null): Promise<string>;
}
