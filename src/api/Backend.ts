namespace BB {

    export abstract class Backend {
        private static backend : BBBackend;

        public static setBackend(backend : BBBackend) {
            this.backend = backend;
        }

        public static getBackend() {
            if(!this.backend) {
                throw new Error("Error: !!!Backend not set!!!");
            }

            return this.backend;
        }
    }
    
}
