import { BBBackend } from "../../@types/BBBackend";
import { HTTPRequest, Utilities } from '../../common';
import Email from '../../common/BBAbstractBackend/email';

export default class BBEmails extends Email {
    public sendMail(parameters: BBBackend.SendMailParameter): Promise<BBBackend.ITaskComplete> {
        const path: string = "/webapps/blackboard/email/caret.jsp?course_id=" + parameters.courseId + "&family=" + parameters.recipients.getNavItem();
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync( path ).then( (response) => {
                const parser: DOMParser = new DOMParser();
                const dom: HTMLDocument = parser.parseFromString(response, 'text/html') as HTMLDocument;
                const securityNonce: string = Utilities.getNonceFromForm(dom, 'emailForm');
                const formData: FormData = new FormData();
                formData.append('blackboard.platform.security.NonceUtil.nonce', securityNonce);
                formData.append('navItem', parameters.recipients.getNavItem());
                formData.append('messagetext_f', '');
                formData.append('messagetext_w', '');
                formData.append('messagetype', '');
                formData.append('textbox_prefix', 'messagetext');
                formData.append('course_id', parameters.courseId);
                formData.append('subject', parameters.subject);
                formData.append('messagetext', parameters.body);
                if (parameters.recipients.type > 0) {
                    formData.append('multiselect_right_values', parameters.recipients.asTargetList());
                }
                if (parameters.attachments.length > 0) {
                    for (let i: number = 0; i < parameters.attachments.length; i++) {
                        // The index in the name starts at 1, not 0.
                        const name: string = 'email_file_' + (i + 1).toString();
                        formData.append(name, parameters.attachments[i]);
                    }
                }
                // prependRecipientNames should only be present when the checkbox is checked.
                // Its existence, ignoring the value, indicates that the checkbox was checked.
                if (parameters.returnRecipient) {
                    formData.append('prependRecipientNames', 'on');
                }
                return HTTPRequest.postAsync(path, formData);
            }).then((response) => {
                const resultObject: BBBackend.ITaskComplete = {
                    success: true
                };
                resolve(resultObject);
            });
        });
    }
}
