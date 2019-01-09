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
}
