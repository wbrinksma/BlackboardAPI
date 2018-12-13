import { BBBackend } from "../@types/BBBackend";
import EmailRecipient from "../common/EmailRecipient";
import Backend from "./Backend";

export default class BBEmail {
    private readonly _courseId: string;

    private _subject: string;
    private _message: string;
    private _recipients: EmailRecipient;
    private _returnRecipient: boolean;
    private _attachments: Blob[];

    constructor(courseId: string, recipients: EmailRecipient) {
        this._courseId = courseId;
        this._recipients = recipients;
        this._subject = '';
        this._message = '';
        this._returnRecipient = false;
        this._attachments = [];
    }

    get courseId(): string {
        return this._courseId;
    }

    get subject(): string {
        return this._subject;
    }

    set subject(subject: string) {
        this._subject = subject;
    }

    get message(): string {
        return this._message;
    }

    set message(message: string) {
        this._message = message;
    }

    get recipients(): EmailRecipient {
        return this._recipients;
    }

    set recipients(recipients: EmailRecipient) {
        this._recipients = recipients;
    }

    get returnRecipient(): boolean {
        return this._returnRecipient;
    }

    set returnRecipient(returnRecipient: boolean) {
        this._returnRecipient = returnRecipient;
    }

    get attachments(): Blob[] {
        return this._attachments;
    }
    set attachments(attachments: Blob[]) {
        this._attachments = attachments;
    }
    public addAttachment(attachment: Blob) {
        this._attachments.push(attachment);
    }

    public send(): Promise<BBBackend.ITaskComplete> {
        const parameters: BBBackend.SendMailParameter = {
            attachments: this.attachments,
            body: this.message,
            courseId: this.courseId,
            recipients: this.recipients,
            returnRecipient: this.returnRecipient,
            subject: this.subject
        };

        return Backend.getBackend().email.sendMail(parameters);
    }
}
