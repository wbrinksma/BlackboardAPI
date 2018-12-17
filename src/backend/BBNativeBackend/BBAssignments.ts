import { BBBackend, HTTPRequest, Utilities } from '../../common';
import Assignments from '../../common/BBBackend/assignments';

export default class BBAssignments extends Assignments {
    public submit(parameters: BBBackend.AssignmentParameter): Promise<BBBackend.ITaskComplete> {
        let path: string = "webapps/assignment/uploadAssignment?action=submit&content_id=";
        path = path + parameters.contentId + "&course_id=" + parameters.courseId;

        return new Promise((resolve, reject) => {
          HTTPRequest.getAsync(path).then((response) => {
              const parser = new DOMParser();
              const dom = parser.parseFromString(response, 'text/html') as HTMLDocument;
              const securityNonce = Utilities.getNonceFromForm(dom, 'uploadAssignmentForm');

              const formData = new FormData();
              formData.append('blackboard.platform.security.NonceUtil.nonce', securityNonce);
              formData.append('attempt_id', '');
              formData.append('recallUrl', 'webapps/blackboard/content/listContent.jsp');
              formData.append('isAjaxSubmit', 'false'); // Would require an ajax securityNonce otherwise.
              formData.append('course_id', parameters.courseId);
              formData.append('content_id', parameters.contentId);
              formData.append('mode', 'view'); // Obsolete?
              formData.append('dispatch', 'submit');
              formData.append('studentSubmission.type', 'H');
              formData.append('textbox_prefix', 'studentSubmission.text');
              formData.append('studentSubmission.text', parameters.submission);
              formData.append('student_commentstype', 'H');
              formData.append('textbox_prefix', 'student_commentstext');
              formData.append('student_commentstext', '');
              formData.append('newFilefilePickerLastInput', 'dummyValue');

              return HTTPRequest.postAsync(path, formData);
          }).then((response) => {
              const resultObject: BBBackend.ITaskComplete = {
                  success: true
              };
              resolve(resultObject);
          });
        });
    }

    public getAssignments(parameters: BBBackend.CourseID): Promise<BBBackend.IAssignment[]> {
      const path: string = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/columns";

      return new Promise((resolve, reject) => {
        HTTPRequest.getAsync(path).then((response) => {
            const assignmentInformation = JSON.parse(response);
            const responseInfo = new Array<BBBackend.IAssignment>();

            assignmentInformation.results.forEach((result) => {
                const resultObject: BBBackend.IAssignment = {
                    attemptsAllowed: result.grading.attemptsAllowed,
                    available: result.availability.available,
                    contentId: result.contentId,
                    decimals: result.score.decimalPlaces,
                    desc: result.description,
                    id: result.id,
                    name: result.name,
                    possibleScore: result.score.possible,
                    scoringModel: result.grading.scoringModel
                };

                responseInfo.push(resultObject);
            });

            resolve(responseInfo);
        });
      });
    }
}
