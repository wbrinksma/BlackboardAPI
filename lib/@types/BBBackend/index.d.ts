/* tslint:disable:no-namespace */

declare namespace BBBackend {
    type UserID = {"userId": string};
    type Offset = {"offset": number};
    type CourseID = {"courseId": string};
    type UserName = {"userName": string};
    type UserParameter = {"userId"?: string, "userName"?: string};
    type ContentID = {"contentId": string};
    type ColumnID = {"courseId": string, "columnId": string};
    type AssignmentID = ColumnID & {"attemptId": string};
    type FileId = {"id": string};
    type FileUpload = {"file": File};

    type EnrolledCoursesParameter = UserID & Offset;

    type SendMailParameter = CourseID & {
        "attachments": Blob[],
        "recipients": Recipient,
        "returnRecipient": boolean,
        "subject": string,
        "body": string
    };

    type Recipient = {
        "targets": string,
        "navItem": string
    };

    type CreateFolderParameter = CourseID & {
        "courseName": string,
        "folderName": string
    };

    type FileInfoParameter = CourseID & {};

    type FileBodyParameter = FileInfoParameter & {"body": string};

    type CourseContentParameter = CourseID & ContentID;
    type CreateColParameter = CourseID & {"body": string};
    type UpdateColParameter = CreateColParameter & {"columnId": string};

    type CreateAssignmentParameter = ColumnID & {"attemptInput": string};
    type UpdateAssignmentParameter = AssignmentID & CreateAssignmentParameter;

    type AssignmentAttemptFilesParameter = CourseID & {"attemptId": string};
    type AssignmentAttemptFileParameter = CourseID & {"attemptId": string, "attemptFileId": string};
    type AssignmentAttemptParameter = AssignmentAttemptFilesParameter & {"fileId": string};

    interface IUserInformation {
        readonly firstName: string;
        readonly lastName: string;
    }

    interface ICourseID {
        readonly id: string;
    }

    interface ICourseInformation {
        courseId: string;
        readonly id: string;
        readonly uuid: string;
        readonly externalId: string;
        readonly dataSourceId: string;
        readonly name: string;
        readonly description: string;
        readonly created: string;
        readonly organization: boolean;
        readonly ultraStatus: string;
        readonly allowGuests: boolean;
        readonly readOnly: boolean;
        readonly available: string;
        readonly duration: string;
        readonly enrollment: string;
        readonly locale: boolean;
        readonly accessCode: string;
        readonly hasChildren: boolean;
        readonly parentId: string;
    }

    interface ICourseContent {
        readonly id: string;
        readonly parentId: string;
        readonly title: string;
        readonly body: string;
        readonly description: string;
        readonly created: string;
        readonly position: number;
        readonly hasChildren: boolean;
        readonly hasGradebookColumns: boolean;
        readonly hasAssociatedGroups: boolean;
        readonly available: string;
        readonly allowGuests: boolean;
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

    interface IGroup {
        readonly id: string;
        readonly name: string;
        readonly desc: string;
    }

    interface IAssignment {
        readonly attemptsAllowed: number;
        readonly available: boolean;
        readonly contentId: string;
        readonly desc: string;
        readonly due: string;
        readonly id: string;
        readonly name: string;
        readonly score: number;
    }

    interface IAssignmentAttempt {
        readonly created: string;
        readonly feedback: string;
        readonly groupAttemptId: string;
        readonly id: string;
        readonly notes: string;
        readonly score: number;
        readonly status: string;
        readonly studentComments: string;
        readonly studentSubmission: string;
        readonly text: string;
        readonly userId: string;
    }

    interface IAssignmentAttemptFile {
        readonly id: string;
        readonly name: string;
        readonly url: string;
    }
}
