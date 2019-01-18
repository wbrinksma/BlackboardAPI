# Uploads in Blackboard

Blackboard exposes one API module for uploading files: `/learn/api/public/v1/uploads`. This module takes form data with a single field containing a file. The name of the field is not important.
Blackboard will assign the file an id upon a successful upload. This id can be used in other parts of Blackboard.

For example, attaching a file to an assignment attempt requires a file id, as obtained from the upload module. 
