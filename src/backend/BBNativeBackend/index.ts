import { BBBackend, HTTPRequest } from '../../common';
import BBCourses from './BBCourses';
import BBEmail from './BBEmail';
import BBFiles from './BBFiles';
import BBGroups from './BBGroups';
import BBMisc from './BBMisc';
import BBUsers from './BBUsers';

/**
 * @see BBBackend
 */
export default class BBNativeBackend extends BBBackend {
  public courses = new BBCourses();
  public email = new BBEmail();
  public files = new BBFiles();
  public groups = new BBGroups();
  public misc = new BBMisc();
  public users = new BBUsers();
}
