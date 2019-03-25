# Files in Blackboard

Blackboard has its own content management system that allows Teachers to upload filed and change permissions for them. The content management API is not used directly but instead a series of calls are made to through the front end blackboard aplication. This is done in order to obtain the privileges and permissions for the upload and creation of files.

### Create Folder
Found under: `/webapps/cmsmain/webui/courses/_COURSE_ID?action=upload?subaction=createdictionary&uniq=UNIQ&course_id=ID&blackboard.platform.security.NonceUtil.nonce=NONCE`

Creates a folder in the Content Management System

### Publish File
Found under: `/webapps/cmsmain/webui/courses/COURSE_ID?action=upload&subaction=uploadFiles&uniq=UNIQ&gobackto=/courses/ID`

This section needs a form with the following being important parameters:
`blackboard.platform.security.NonceUtil.nonce` for the security Nonce
`newFile_linkTitle` for the name of the file
`newFile_LocalFile0` for the Blob of the file (the actual file)

### Delete and Download File
Found under: 
`/webapps/cmsmain/webui/courses/ID`

This section needs a form with the following being important parameters:
`subaction` the action we want to take, either `delete` or `download`
`course_id` the course id from which we want to delete the file.

### Set Permissions of a File
Found under: `https://blackboard.nhlstenden.com/webapps/cmsmain/webui/courses/COURSE_ID/Test?action=permissions&subaction=doaddcourseuserlist&uniq=UNIQ&gobackto=dirList-&course_id=ID`

This section needs a form with the following being important parameters that can be set to either true or false:
`bAllowEveryone` can all users of the course access the file
`B` can the course builder access the file
`G` can the grader access the file
`P` can the course manager access the file
`S` can the student access the file
`T` can the teacher access the file
`U` can a gues access the file
`bAllowRead` is the user allowed to read the file
`bAllowWrite` is the user allowed to write the file
`bAllowDelete` is the suer allowed to delete the file
`bAllowManage` is the user allowed to manage the file