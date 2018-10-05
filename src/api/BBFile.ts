namespace BB {

    export class BBFile {
        private _courseId : string;

        constructor(courseId : string) {
            this._courseId = courseId;
        }
        
        get courseId() : string {
            return this._courseId;
        }

        
    }
    
}
