import Backend from './Backend';

/**
 * An object for referring to users. Can only be constructed by
 * derived classes {@link BBUserInfoById} and {@link BBUserInfoByUname}.
 */
export abstract class BBUserInfo {
    protected _userName: string;
    protected _userId: string;

    private userInfo: BBBackend.IUserInfo;
    private enrolledCourses: BBBackend.ICourseID[];

    public getUserName(): Promise<string> {
      return new Promise((resolve, reject) => {
          if (this._userName) {
              resolve(this._userName);
              return;
          }

          this.getUserInfo().then(() => {
              resolve(this._userName);
          });
      });
    }

    public getUserId(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this._userId) {
                resolve(this._userId);
                return;
            }

            this.getUserInfo().then(() => {
                resolve(this._userId);
            });
        });
    }

    public getUserInfo(): Promise<BBBackend.IUserInfo> {
        return new Promise((resolve, reject) => {
            let parameters;

            if (this.userInfo) {
                resolve(this.userInfo);
                return;
            }

            if (this._userName) {
                const param: BBBackend.UserParameter = {
                    userName: this._userName
                };
                parameters = param;
            } else if (this._userId) {
                const param: BBBackend.UserParameter = {
                    userId: this._userId
                };
                parameters = param;
            } else {
                throw new Error (
                  "BBUserInfo: expecting userId or userName to be not null. Rejecting getUserInfo().."
                );
                reject();
                return;
            }

            Backend.getBackend().getUserInfo(parameters).then((information) => {
                this.userInfo = information;
                this._userId = this.userInfo.id;
                this._userName = this.userInfo.username;
                resolve(this.userInfo);
            });
        });
    }

    public getEnrolledCourses(): Promise<BBBackend.ICourseID[]> {
        return new Promise((resolve, reject) => {
            if (this.enrolledCourses) {
                resolve(this.enrolledCourses);
                return;
            }

            this.getUserInfo().then((uinfo) => {
                const parameters: BBBackend.EnrolledCoursesParameter = {
                    offset: 0,
                    userId: uinfo.id
                };

                Backend.getBackend().getEnrolledCourses(parameters).then((information) => {
                    this.enrolledCourses = information;
                    resolve(this.enrolledCourses);
                });
            });
        });
    }
}

/**
 * Should be treated as {@link BBUserInfo}.
 * @extends BBUserInfo
 * @see BBUserInfoByUname
 */
export class BBUserInfoById extends BBUserInfo {
  /**
   * @constructor
   * @param userId The user's ID.
   * @example let user = new BBUserInfoById("_666666_1_");
   */
  constructor(userId: string) {
    super();
    this._userId = userId;
  }
}

/**
 * Should be treated as {@link BBUserInfo}.
 * @extends BBUserInfo
 * @see BBUserInfoById
 */
export class BBUserInfoByUname extends BBUserInfo {
  /**
   * @constructor
   * @param userName The user's name.
   * @example let user = new BBUserInfoByUname("gast0000");
   */
  constructor(userName: string) {
    super();
    this._userName = userName;
  }
}
