import Courses from './courses';
import Email from './email';
import Files from './files';
import GradeColumns from './gradeColumns';
import Groups from './groups';
import Misc from './misc';
import Users from './users';

/**
 * Abstract class which specifies the entry point of the API. This contains
 * all function declarations that communicate with Blackboard.
 */
export default abstract class BBAbstractBackend {
    public courses: Courses;
    public email: Email;
    public files: Files;
    public gradeColumns: GradeColumns;
    public groups: Groups;
    public misc: Misc;
    public users: Users;
}
