import Backend from './Backend';
import BBUser from './BBUser';

export default class BBEmail {
    private _courseId: string;

    private _subject: string;
    private _message: string;

    private _recipients = new Array<BBUser>();

    constructor(courseId: string) {
        this._courseId = courseId;
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

    get recipients(): BBUser[] {
        return this._recipients;
    }

    public addRecipient(user: BBUser): void {
        if (this._recipients.find((value, index, obj) => {
            return value.userId === user.userId;
        })) {
            return;
        }

        this._recipients.push(user);
    }

    public send(): Promise<BBBackend.ITaskComplete> {
        const recipientIds = new Array<string>();
        this._recipients.forEach((value, index, array) => {
            recipientIds.push(value.userId);
        });

        const parameters: BBBackend.SendMailParameter = {
            body: this.message,
            courseId: this.courseId,
            recipientIds,
            subject: this.subject,
        };

        return Backend.getBackend().email.sendMail(parameters);
    }
}
