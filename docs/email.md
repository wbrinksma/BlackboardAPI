# Sending email through Blackboard

As specified in the compatibility report, Blackboard does currently not support sending emails through its API.

## The different email options
Blackboard offers multiple ways of sending email through its web interface. This functionality can be found under `/webapps/blackboard/email/caret.jsp?family=cp_send_email&course_id=_COURSE_ID`.
Below is an overview with the different options offered to users.

### General information
There is no unified form in Blackboard for sending emails. Each option, as elaborated below, has its own page.
All email options share a common entry point: `/webapps/blackboard/execute/displayEmail?navItem=NAV_ITEM&course_id=_COURSE_ID`.
All form submissions should be send to `/webapps/blackboard/execute/sendEmail?navItem=NAV_ITEM&course_id=_COURSE_ID`.

#### Hidden inputs shared by all
- `course_id` - Course id.
- `blackboard.platform.security.NonceUtil.nonce` - Security nonce. Hexadecimal UUID. Note that you need the nonce from the email form. There might be another nonce for the edit mode, which is only available to teachers.
- `navItem` - Name of email functionality.
- `messagetext` - Message body. Regular text.
- `messagetext_f` - Unknown. Should be sent as provided in the HTML source.
- `messagetext_w` - Unknown. Should be sent as provided in the HTML source.
- `messagetype` - Unknown. Should be sent as provided in the HTML source.
- `textbox_prefix` - Unknown. Should be sent as provided in the HTML source.

#### General inputs shared by all
- `subject` - Text, 255 characters maximum.
- `prependRecipientNames` - checkbox that activates a Return Receipt email.
- `email_file_1` - File. An optional email attachment. This field is dynamic, meaning that it can appear an unlimited amount of times, incrementing the number in the name each time it appears.

### All Users
Found under: 
`/webapps/blackboard/execute/displayEmail?navItem=cp_send_email_all_users&course_id=_COURSE_ID`

This way sends email to all users in the course. Blackboard will select the recipients. These cannot be changed. Using this module has the advantage that it does not require knowing which users are in the course, and looking up their ids is not required.

### All Groups
Found under: `/webapps/blackboard/execute/displayEmail?navItem=cp_send_email_all_groups&course_id=_COURSE_ID`

Similar to [All users](#all-users).

### All Teachers
Found under: `/webapps/blackboard/execute/displayEmail?navItem=cp_send_email_all_ta&course_id=_COURSE_ID`

Similar to [All users](#all-users) and [All groups](#all-groups), except only those with the teacher role will be sent an email.

### All Students
Found under: `/webapps/blackboard/execute/displayEmail?navItem=cp_send_email_all_students&course_id=_COURSE_ID`

Similar to [All Teachers](#all-teachers), except only those with the student role will be sent an email.

### All Course Managers
Found under: `/webapps/blackboard/execute/displayEmail?navItem=cp_send_email_all_instructors&course_id=_COURSE_ID`

Similar to [All Teachers](#all-teachers) and [All Students](#all-students), except only those with the course manager role will be sent an email.


### All Observers
Found under: `/webapps/blackboard/execute/displayEmail?navItem=cp_send_email_all_observers&course_id=_COURSE_ID`

Similar to [All Teachers](#all-teachers),  [All Students](#all-students) and [All Course Managers](#all-course-managers), except only those with the observer role will be sent an email.

### Selected users
Found under `/webapps/blackboard/execute/displayEmail?navItem=cp_send_email_select_students&course_id=_COURSE_ID`

Sends email to all selected recipients.
A list of recipients is provided by Blackboard under the select dropdown with the name `USERS_AVAIL`. Each option contains a value attribute with the id of the user. A display name is available in the element value.
- `multiselect_left_values` - Hidden. Comma separated list of user ids of the users that can be added as a recipient. Be aware that the list is also comma terminated!
- `multiselect_right_values` - Hidden. Comma separated list of user ids of users to add as a recipient. Be aware that the list is also comma terminated!

### Selected groups
Found under `/webapps/blackboard/execute/displayEmail?navItem=cp_send_email_select_groups&course_id=_COURSE_ID`

Similar to [Selected users](#selected-users).

Sends email to all selected groups.
A list of recipients is provided by Blackboard under the select dropdown with the name `USERS_AVAIL`. Each option contains a value attribute with the id of the group. A display name is available in the element value.
- `multiselect_left_values` - Hidden. Comma separated list of group ids of the groups that can be added as a recipient. Be aware that the list is also comma terminated!
- `multiselect_right_values` - Hidden. Comma separated list of group ids of groups to add as a recipient. Be aware that the list is also comma terminated!

### Selected observers
Found under `/webapps/blackboard/execute/displayEmail?navItem=cp_send_email_select_observers&course_id=_COURSE_ID`

Similar to [Selected users](#selected-users) and [Selected groups](#selected-groups).

Sends email to all selected observers.
A list of recipients is provided by Blackboard under the select dropdown with the name `USERS_AVAIL`. Each option contains a value attribute with the id of the observer. A display name is available in the element value.
- `multiselect_left_values` - Hidden. Comma separated list of observer ids of the observer that can be added as a recipient. Be aware that the list is also comma terminated!
- `multiselect_right_values` - Hidden. Comma separated list of observer ids of observers to add as a recipient. Be aware that the list is also comma terminated!
