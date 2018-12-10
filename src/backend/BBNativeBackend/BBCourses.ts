import {BBBackend} from "../../@types/BBBackend";
import { HTTPRequest } from '../../common';
import Courses from '../../common/BBAbstractBackend/courses';

export default class BBCourses extends Courses {
  public getEnrolledCourses(parameters: BBBackend.EnrolledCoursesParameter): Promise<BBBackend.ICourseID[]> {
      const path = "/learn/api/public/v1/users/" + parameters.userId + "/courses?offset=" + parameters.offset;
      console.log(path);
      return new Promise((resolve, reject) => {
          HTTPRequest.getAsync(path).then((response) => {
              const allCourseInformation = JSON.parse(response);
              const responseInfo = new Array<BBBackend.ICourseID>();

              allCourseInformation.results.forEach((result) => {
                  const resultObject: BBBackend.ICourseID = {
                      id: result.courseId,
                  };

                  responseInfo.push(resultObject);
              });

              resolve(responseInfo);
          });
      });
  }

  public getCourseInformation(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseInformation> {
      const path = "/learn/api/public/v1/courses/" + parameters.courseId;
      return new Promise((resolve, reject) => {
          HTTPRequest.getAsync(path).then((response) => {
              const courseInformation = JSON.parse(response);

              const resultObject: BBBackend.ICourseInformation = {
                  description: courseInformation.description,
                  id: courseInformation.courseId,
                  name: courseInformation.name
              };

              resolve(resultObject);
          });
      });
  }
}
