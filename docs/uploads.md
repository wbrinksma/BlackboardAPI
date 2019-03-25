# Uploads in Blackboard

Blackboard exposes one API module for uploading files: `/learn/api/public/v1/uploads`. This module takes form data with a single field containing a file. The name of the field is not important.
Blackboard will assign the file an id upon a successful upload. This id can be used in other parts of Blackboard.

For example, attaching a file to an assignment attempt requires a file id, as obtained from the upload module.

Therefor, the process for adding content to Blackboard usually looks like this:

 POST > `/learn/api/public/v1/uploads` >
```
{
    "id": "_1_34364" 
}
```

POST > `/learn/api/public/v2/courses/_2_667712/gradebook/attempts/_3_114678/files` >
```
{
    "id": "_2_44879",
    "name": "assignment.pdf", 
    "viewUrl": "https:"//blackboard.education.edu/file/_2_44879/assignment.pdf, 
}
```
