/* tslint:disable:max-line-length */

import { HTTPRequest, Utilities } from '../../common';
import GradeColumns from '../../common/BBAbstractBackend/gradeColumns';

export default class BBGradeColumns extends GradeColumns {
    public getAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.IAssignment> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
        return new Promise((resolve, reject) => {
              HTTPRequest.getAsync(path).then((response) => {
                  const column = JSON.parse(response);

                  const result: BBBackend.IAssignment = {
                    available: column.availability.available,
                    contentId: column.contentId,
                    decimals: column.score.decimalPlaces,
                    desc: column.description,
                    id: column.id,
                    name: column.name,
                    possibleScore: column.score.possibleScore
                  };

                  resolve(result);
              });
        });
    }

    public deleteAssignmentCol(parameters: BBBackend.ColumnID): Promise<BBBackend.ITaskComplete> {
        const path = "https://blackboard.nhlstenden.com/webapps/gradebook/do/instructor/deleteItem?course_id=" + parameters.courseId;
        return new Promise((resolve, reject) => {
            const nonce: string = Utilities.getNonceFromCourseId(parameters.courseId);
            const formData = new FormData();
            formData.append('itemId', parameters.columnId);
            formData.append('blackboard.platform.security.NonceUtil.nonce', nonce);
            HTTPRequest.postAsync(path, formData).then((response) => {
                const result: BBBackend.ITaskComplete = {success: true};

                resolve(result);
            });
        });
    }

    public updateAssignmentCol(parameters: BBBackend.UpdateColParameter): Promise<BBBackend.IAssignment> {
      //const path = "https://blackboard.nhlstenden.com/webapps/gradebook/do/instructor/addModifyItemDefinition";
      //const formData = new FormData();
  const path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
  const nonce = Utilities.getNonceFromCourseId(parameters.courseId);
  const formData = new FormData();
  formData.append('blackboard.platform.security.NonceUtil.nonce', nonce);
  return new Promise((resolve, reject) => {
        HTTPRequest.patchAsync(path, formData).then((response) => {
            const column = JSON.parse(response);

            const result: BBBackend.IAssignment = {
              available: column.availability.available,
              contentId: column.contentId,
              decimals: column.score.decimalPlaces,
              desc: column.description,
              id: column.id,
              name: column.name,
              possibleScore: column.score.possibleScore
            };

            resolve(result);
        });
  });
      // HTTPRequest.getAsync(noncePath).then((response) => {
      // const parser = new DOMParser();
      // const dom = parser.parseFromString(response, 'text/html') as HTMLDocument;
      // const nonce = Utilities.getNonceFromForm(dom, 'item_definition_form');
      //
      //
      // formData.append('blackboard.platform.security.NonceUtil.nonce', nonce);
      // formData.append('courseId', parameters.courseId);
      // formData.append('gradeableItemId', parameters.columnId);
      // //formData.append('input', parameters.body);
      //
      //   HTTPRequest.patchAsync(path, formData).then((response) => {
      //     const information = JSON.parse(response);
      //     const column: BBBackend.IAssignment = {
      //       available: information.availability.available,
      //       contentId: information.contentId,
      //       decimals: information.decimals,
      //       desc: information.description,
      //       id: information.id,
      //       name: information.name,
      //       possibleScore: information.score.possible
      //     };
      //
      //     resolve(column);
      //   });
      // });
      // });
    }
}
