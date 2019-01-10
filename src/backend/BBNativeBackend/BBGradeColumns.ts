/* tslint:disable:max-line-length */

import { HTTPRequest } from '../../common';
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
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
        return new Promise((resolve, reject) => {
            HTTPRequest.deleteAsync(path).then((response) => {
                const result: BBBackend.ITaskComplete = {success: true};

                resolve(result);
            });
        });
    }

    public updateAssignmentCol(parameters: BBBackend.UpdateColParameter): Promise<BBBackend.IAssignment> {
      const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
      const formData = new FormData();

      formData.append('courseId', parameters.courseId); // Obsolete?
      formData.append('columnId', parameters.columnId); // Obsolete?
      formData.append('input', parameters.body);

      return new Promise((resolve, reject) => {
        HTTPRequest.patchAsync(path, formData).then((response) => {
          const information = JSON.parse(response);
          const column: BBBackend.IAssignment = {
            available: information.availability.available,
            contentId: information.contentId,
            decimals: information.decimals,
            desc: information.description,
            id: information.id,
            name: information.name,
            possibleScore: information.score.possible
          };

          resolve(column);
        });
      });
    }
}
