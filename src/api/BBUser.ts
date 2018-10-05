namespace BB {

    export class BBUser {
        private _userId : string;

        private enrolledCourses : BBBackend.CourseInformation[];

        constructor(userId : string) {
            this._userId = userId;
        }
        
        get userId() : string {
            return this._userId;
        }

        public getEnrolledCourses() : Promise<BBBackend.CourseInformation[]> {
            return new Promise((resolve,reject) => {
                if(this.enrolledCourses) {
                    resolve(this.enrolledCourses);
                    return;
                }
                
                var parameters : BBBackend.EnrolledCoursesParameter = {
                    userId: this.userId,
                    offset: 0
                }
    
                Backend.getBackend().getEnrolledCourses(parameters).then((information) => {
                    this.enrolledCourses = information;
                    resolve(this.enrolledCourses);
                });
            });
        }
    }
    
}
