import {EmailRecipient} from "../../common";

declare namespace BBBackend {
    type UserID = {"userId": string};
    type Offset = {"offset": number};
    type CourseID = {"courseId": string};
    type UserName = {"userName": string};
    type UserParameter = {"userId"?: string, "userName"?: string};

    type EnrolledCoursesParameter = UserID & Offset;

    type SendMailParameter = CourseID & {
        "attachments": Blob[],
        "recipients": EmailRecipient,
        "returnRecipient": boolean,
        "subject": string,
        "body": string
    };

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

    interface IGroup {
      readonly id: string;
      readonly name: string;
      readonly desc: string;
    }
}
