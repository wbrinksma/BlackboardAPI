declare namespace BBBackend {
    type UserID = {"userId": string};
    type EnrolledCoursesParameter = UserID & {"offset": number};

    type CourseIdParameter = {"courseId": string};

    type SendMailParameter = CourseIdParameter & {"recipientIds": string[], "subject": string, "body": string};

    type FileInfoParameter = CourseIdParameter & {};

    type FileBodyParameter = FileInfoParameter & {"body": string};

    interface IUserInformation {
        readonly firstName: string;
        readonly lastName: string;
    }

    interface ICourseInformation {
        readonly id: string;
    }

    interface IFileInfo {
        filename: string;
    }

    interface ITaskComplete {
        success: boolean;
    }
}