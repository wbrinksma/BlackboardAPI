let user = null;
let course = null;

function loadUserByUserId(userId) {
    let user = new BB.BBUserInfoById(userId);
    user.getUserInfo().then((result) => {
        console.log(result);
    });

    console.log(user.getUserName);

    return user;
}

function loadEnrolledCourses(userId) {
    if(user == null) {
        user = userId[0] === '_' ? new BB.BBUserInfoById(userId) : new BB.BBUserInfoByUsername(userId);
    }
    user.getEnrolledCourses().then((result) => {
        console.log(result);

    });
    return user;
}

function loadCourse(courseId) {
    course = new BB.BBCourse(courseId);
    course.getCourse().then((result) => {
        console.log(result);
    });
}
function loadUserByUserName(userName) {
    let user = new BB.BBUserInfoByUsername(userName);
    user.getUserInfo().then((result) => {
        console.log(result);
    });

    console.log(user.getUserId);
}

function postCourse() {
    course = new BB.BBCourse();
    course.postCourse().then((result) => {
        console.log(result);
    });
}

function deleteCourse(courseId) {
    course = new BB.BBCourse(courseId);
    course.deleteCourse().then((result) => {
        console.log(result);
    });
}

function patchCourse(courseId) {
    course = new BB.BBCourse(courseId);
    course.patchCourse().then((result) => {
        console.log(result);
    });
}

function loadCourseContents(courseId) {
    course = new BB.BBCourse(courseId);
    course.getCourseContents().then((result) => {
        console.log(result);
    });
}

function postCourseContent(courseId) {
    course = new BB.BBCourse(courseId);
    course.postCourseContent().then((result) => {
        console.log(result);
    });
}

function deleteCourseContent(courseId, contentId) {
    course = new BB.BBCourse(courseId);
    course.deleteCourseContent(contentId).then((result) => {
        console.log(result);
    });
}

function patchCourseContent(courseId, contentId) {
    course = new BB.BBCourse(courseId);
    course.patchCourseContent(contentId).then((result) => {
        console.log(result);
    });
}

function loadCourseContent(courseId, contentId) {
    course = new BB.BBCourse(courseId);
    course.getCourseContent(contentId).then((result) => {
        console.log(result);
    });
}

function loadCourseContentChildren(courseId, contentId) {
    course = new BB.BBCourse(courseId);
    course.getCourseContentChildren(contentId).then((result) => {
        console.log(result);
    });
}

function postCourseContentChildren(courseId, contentId) {
    course = new BB.BBCourse(courseId);
    course.postCourseContentChildren(contentId).then((result) => {
        console.log(result);
    });
}

function loadAssignments(courseId) {
    course = new BB.BBCourse(courseId);
    course.getAssignmentsCol().then((result) => {
        console.log(result);
    });
}


function loadCourseChildren(courseId) {
    course = new BB.BBCourse(courseId);
    course.getCourseChildren().then((result) => {
        console.log(result);
    });
}

/**
 *
 * @param {string} target
 * @param {string} subject
 * @param {string} body
 * @param {FileList} attachments
 */
function sendMail(target, subject, body, attachments) {
    let emailTarget;
    switch (target) {
        case "AllUsers":
            emailTarget = BB.EmailTarget.AllUsers;
            break;
        case "AllGroups":
            emailTarget = BB.EmailTarget.AllGroups;
            break;
        case "AllTeachers":
            emailTarget = BB.EmailTarget.AllTeachers;
            break;
        case "AllStudents":
            emailTarget = BB.EmailTarget.AllStudents;
            break;
        case "AllCourseManagers":
            emailTarget = BB.EmailTarget.AllCourseManagers;
            break;
        case "AllObservers":
            emailTarget = BB.EmailTarget.AllObservers;
            break;
        default:
            throw new Error('Not supported target!');
    }

    const recipient = new BB.EmailRecipient(emailTarget);
    let email = new BB.BBEmail('_20166_1', recipient);
    email.message = body;
    email.subject = subject;

    for (let i = 0; i < attachments.length; i++) {
        email.addAttachment(attachments.item(i));
    }

    email.send().then((result)=> {
        console.log(result);
    });
}

function createFolder(courseId){
    if(course == null){
        course = new BB.BBCourse(courseId);
    }
    let file = new BB.BBFile(course);
    console.log(file);
    file.createFolder().then((result) => {
        console.log(result);
    })
}

function createAssignment() {
    let name = document.getElementById('createAssName').value;
    let desc = document.getElementById('createAssDesc').value;
    let score = document.getElementById('assScorePossible').value;
    let course = document.getElementById('cidBox').value;
    let request = new BB.BBCourse(course);

    let json = {
        columnName: name,
        gradebookDisplayName: desc,
        descriptiontext_f: "",
        descriptiontext_w: "",
        rubrics_gradableItem: "",
        duedate_datetime: "",
        pickdate: "",
        pickname: "",
        duedate_date: "",
        gradeableItemId: "",
        originalPrimarySchema: "",
        duedate_time: "",
        pointsDisplay: score,
        courseId: course,
        position: 0,
        scorable: true,
        visible: true,
        hideAttempt: false,
        descriptiontype: "H",
        textbox_prefix: "descriptiontext",
        descriptiontext: "<p>:)</p>",
        primarySchemaChanged: false,
        bottom_Submit: "Submit",
        usedInCalculation: false
        // score: {
        //     possible: score
        // },
        // grading: {
        //     type: "Attempts",
        //     anonymousGrading: {}
        // }
    };

    request.createAssignmentCol(JSON.stringify(json)).then((result) => {
        console.log(result);
    });
}

function updateAssignment() {
    let name = document.getElementById('createAssName').value;
    let desc = document.getElementById('createAssDesc').value;
    let score = document.getElementById('assScorePossible').value;
    let course = document.getElementById('cidBox').value;
    let assignment = document.getElementById('asBox').value;
    let column = new BB.BBGradeColumn(course, assignment);

    let json = {
        name: name,
        description: desc,
        score: {
            possible: score
        },
        grading: {
            type: "Attempts",
            anonymousGrading: {}
        }
    };

    column.updateAssignmentCol(JSON.stringify(json)).then((result) => {
        console.log(result);
    });
}

function getAssignment(courseId, assignmentId) {
    let column = new BB.BBGradeColumn(courseId, assignmentId);

    column.getAssignmentCol().then((result) => {
        console.log(result);
    });
}

function delAssignment(courseId, assignmentId) {
    let column = new BB.BBGradeColumn(courseId, assignmentId);

    column.deleteAssignmentCol().then((result) => {
        console.log(result);
    });
}


window.onload = () => {
    BB.Backend.setBackend(new BB.BBIframeBackend());
}
