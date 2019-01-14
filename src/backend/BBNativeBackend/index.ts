import { BBAbstractBackend } from '../../common';
import BBCourses from './BBCourses';
import BBEmails from './BBEmails';
import BBFiles from './BBFiles';
import BBGradeColumns from './BBGradeColumns';
import BBGroups from './BBGroups';
import BBMisc from './BBMisc';
import BBUsers from './BBUsers';

/**
 * @see BBAbstractBackend
 */
export default class BBNativeBackend extends BBAbstractBackend {
    public courses = new BBCourses();
    public email = new BBEmails();
    public files = new BBFiles();
    public gradeColumns = new BBGradeColumns();
    public groups = new BBGroups();
    public misc = new BBMisc();
    public users = new BBUsers();
}
