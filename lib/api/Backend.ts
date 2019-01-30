import {BBAbstractBackend} from '../common';

export default abstract class Backend {
    private static backend: BBAbstractBackend;

    public static setBackend(backend: BBAbstractBackend) {
        this.backend = backend;
    }

    public static getBackend(): BBAbstractBackend {
        if (!this.backend) {
            throw new Error("Error: !!!Backend not set!!!");
        }

        return this.backend;
    }
}
