import Backend from './Backend';

export default class BBUserInfo {
    private _userName;

    private userInfo: BBBackend.IUserInfo;

    constructor(userName: string) {
        this._userName = userName;
    }

    get userName(): string {
        return this._userName;
    }

    public getUserInfo(): Promise<BBBackend.IUserInfo> {
        return new Promise((resolve, reject) => {
            if(this.userInfo) {
                resolve(this.userInfo);
                return;
            }

            const parameters: BBBackend.UserInfoParameter = {
                userName: this._userName
            };

            Backend.getBackend().getUserInfo(parameters).then((information) => {
                this.userInfo = information;
                resolve(this.userInfo);
            });
        });
    }
}
