namespace BB {

    export class BBEmail {
        private _courseId : string;

        private _subject : string;
        private _message : string;

        private _recipients = new Array<BBUser>();
        
        constructor(courseId : string) {
            this._courseId = courseId;
        }

        get courseId() : string {
            return this._courseId;
        }

        get subject() : string {
            return this._subject
        }

        set subject(subject : string) {
            this._subject = subject;
        }

        get message() : string {
            return this._message;
        }

        set message(message : string) {
            this._message = message;
        }

        get recipients() : Array<BBUser> {
            return this._recipients;
        }

        public addRecipient(user : BBUser) : void {
            if(this._recipients.find((value,index,obj) => {
                return value.userId == user.userId;
            })) {
                return;
            }

            this._recipients.push(user);
        }

        public send() : Promise<BBBackend.TaskComplete> {
            var recipientIds = new Array<string>();
            this._recipients.forEach((value,index,array) => {
                recipientIds.push(value.userId);
            });

            var parameters : BBBackend.SendMailParameter = {
                courseId: this.courseId,
                recipientIds: recipientIds,
                subject: this.subject,
                body: this.message
            }

            return BB.Backend.getBackend().sendMail(parameters);
        }
    }
    
}
