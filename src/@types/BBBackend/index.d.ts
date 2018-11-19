declare namespace BBBackend {
    type UserID = {"userId": string};
    type Offset = {"offset": number};
    type CourseID = {"courseId": string};

    type EnrolledCoursesParameter = UserID & Offset;

    type SendMailParameter = CourseID & {"recipientIds": string[], "subject": string, "body": string};

    type FileInfoParameter = CourseID & {};

    type FileBodyParameter = FileInfoParameter & {"body": string};

    interface IUserInformation {
        readonly firstName: string;
        readonly lastName: string;
    }

    interface ICourseID {
        readonly id: string;
    }

    interface ICourseInformation {
        readonly id: string;
        readonly name: string;
        readonly description: string;    
    }

    interface ICourseContent {
        readonly id: string;
        readonly title: string;
        readonly position: number;   
    }

    interface IFileInfo {
        filename: string;
    }

    interface ITaskComplete {
        success: boolean;
    }
}