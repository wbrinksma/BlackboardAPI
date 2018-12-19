import {BBBackend} from "../../@types/BBBackend";
import { BBIframeBackend } from "..";
import Misc from "../../common/BBAbstractBackend/misc";

export default class BBMisc extends Misc {
    private backend: BBIframeBackend;
    private category: string;

    constructor(category: string, backend: BBIframeBackend) {
        super();
        this.backend = backend;
        this.category = category;
    }

    public getBlackboardDomain(): string {
        throw new Error("Method not implemented.");
    }
}
