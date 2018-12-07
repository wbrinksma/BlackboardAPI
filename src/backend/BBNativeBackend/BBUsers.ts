import { BBBackend, HTTPRequest } from '../../common';
import Users from '../../common/BBBackend/users';

export default class BBUsers extends Users {
  public getUserInfo(parameters: BBBackend.UserParameter): Promise<BBBackend.IUserInfo> {
      if (parameters.userId) {
        const path = "/learn/api/public/v1/users/" + parameters.userId;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const userJson = JSON.parse(response);

                const userObject: BBBackend.IUserInfo = {
                    email: userJson.contact.email,
                    firstname: userJson.name.given,
                    id: userJson.id,
                    student: userJson.studentId,
                    surname: userJson.name.family,
                    username: userJson.userName
                };

                resolve(userObject);
            });
      });
      } else if (parameters.userName) {
          const path = "/learn/api/public/v1/users?limit=1&userName=" + parameters.userName;
          return new Promise((resolve, reject) => {
              HTTPRequest.getAsync(path).then((response) => {
                  const userJson = JSON.parse(response);

                  if (userJson.results.length < 1) {
                      reject();
                      return;
                  }

                  const userObject: BBBackend.IUserInfo = {
                      email: userJson.results[0].contact.email,
                      firstname: userJson.results[0].name.given,
                      id: userJson.results[0].id,
                      student: userJson.results[0].studentId,
                      surname: userJson.results[0].name.family,
                      username: userJson.results[0].userName
                  };

                  resolve(userObject);
              });
          });
      }
  }
}
