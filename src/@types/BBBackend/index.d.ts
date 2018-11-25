declare namespace BBBackend {
    type UserID = {"userId": string};
    type Offset = {"offset": number};
    type CourseID = {"courseId": string};
    type UserName = {"userName": string};
    type UserParameter = {"userId"?: string, "userName"?: string};

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

    interface ICourseChild {
        readonly id: string;
        readonly datasourceId: string;
        readonly created: string;
    }

    interface IFileInfo {
        filename: string;
    }

    interface ITaskComplete {
        success: boolean;
    }

    interface IUserInfo {
      readonly id: string;
      readonly username: string;
      readonly firstname: string;
      readonly surname: string;
      readonly student: string;
      readonly email: string;
    }
}
