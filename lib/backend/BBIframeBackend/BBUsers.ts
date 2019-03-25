import {BBIframeBackend} from "..";
import Users from "../../common/BBAbstractBackend/users";

export default class BBUsers extends Users {

    private backend: BBIframeBackend;
    private category: string;

    constructor(category: string, backend: BBIframeBackend) {
        super();
        this.backend = backend;
        this.category = category;
    }

    public getUserInfo(parameters: BBBackend.UserParameter): Promise<BBBackend.IUserInfo> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getUserInfo", parameters);
    }
}
