import { Backend, BBCourse } from '../api';
import { BBNativeBackend, BBIframeBackend } from '../backend';


test('courseInformation', () => {
  //expect.assertions(1);
  Backend.setBackend(new BBIframeBackend());
  var course : BBCourse = new BBCourse('_17977_1'); 
  return course.getCourseInformation().then((result) => {
    console.log(result);
    //expect(result).toBe(0);
  })
});