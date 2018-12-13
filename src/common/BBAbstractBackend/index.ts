import Assignments from './assignments';
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
<<<<<<< HEAD:src/common/BBAbstractBackend/index.ts
export default abstract class BBAbstractBackend {
=======
export default abstract class BBBackend {
    public assignments: Assignments;
>>>>>>> 3a913af... Add experimental assignment-submission API feature.:src/common/BBBackend/index.ts
    public courses: Courses;
    public email: Email;
    public files: Files;
    public groups: Groups;
    public misc: Misc;
    public users: Users;
}
