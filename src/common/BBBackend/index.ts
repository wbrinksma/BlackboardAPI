import Courses from './courses';
import Email from './email';
import Files from './files';
import Groups from './groups';
import Misc from './misc';
import Users from './users';

/**
 * Abstract class which specifies the entry point of the API. This contains
 * all function declarations that communicate with Blackboard.
 */
export default abstract class BBBackend {
    public courses: Courses;
    public email: Email;
    public files: Files;
    public groups: Groups;
    public misc: Misc;
    public users: Users;
}
