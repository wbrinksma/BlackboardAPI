# Blackboard API compatibility

Currently, Blackboard API targets Blackboard learn `3100.0.6-rel.3+cd2a24d`, with newer versions being potentially supported.
Unfortunately, the earliest supported version of Blackboard is [3200.0.8](https://developer.blackboard.com/portal/displayApi).
Below is the compatibility report for Blackboard learn `3100.0.6-rel.3+cd2a24d`, compared against the API overview of [Blackboard learn 3200.0.8](https://developer.blackboard.com/portal/docs/apis/learn-swagger-3200.0.8.json).

## Report

### Modules known to exist
* `/learn/api/public/v1/oauth2/token`
* `/learn/api/public/v1/courses`
* `/learn/api/public/v1/courses/{id}`
* `/learn/api/public/v1/courses/{id}/children`
* `/learn/api/public/v1/courses/{id}/children/{id}`
* `/learn/api/public/v1/courses/{id}/contents`
* `/learn/api/public/v1/courses/{id}/contents/{id}`
* `/learn/api/public/v1/courses/{id}/contents/{id}/children`
* `/learn/api/public/v1/courses/{id}/users`
* `/learn/api/public/v1/courses/{id}/users/{id}`
* `/learn/api/public/v1/dataSources`
* `/learn/api/public/v1/dataSources/{id}`
* `/learn/api/public/v1/terms`
* `/learn/api/public/v1/terms/{id}`
* `/learn/api/public/v1/users`
* `/learn/api/public/v1/users/{id}`
* `/learn/api/public/v1/users/{id}/courses`
* `/learn/api/public/v1/courses/{id}/gradebook/columns`
* `/learn/api/public/v1/courses/{id}/gradebook/columns/{id}`
* `/learn/api/public/v1/courses/{id}/gradebook/columns/{id}/attempts`
* `/learn/api/public/v1/courses/{id}/gradebook/columns/{id}/attempts/{id}`
* `/learn/api/public/v1/courses/{id}/gradebook/columns/{id}/users`
* `/learn/api/public/v1/courses/{id}/gradebook/columns/{id}/users/{id}`
* `/learn/api/public/v1/courses/{id}/gradebook/users/{id}`

### Modules that should not exist 
* `/learn/api/public/v1/announcements` - Supported since version 3100.7.0.
* `/learn/api/public/v1/announcements/{id}` - Supported since version 3100.7.0.
* `/learn/api/public/v1/courses/{id}/groups` - Supported since version 3100.5.0.
* `/learn/api/public/v1/courses/{id}/groups/{id}` - Supported since version 3100.5.0.
* `/learn/api/public/v1/courses/{id}/groups/{id}/users` - Supported since version 3100.6.0.
* `/learn/api/public/v1/courses/{id}/groups/{id}/users/{id}` - Supported since version 3100.6.0.

### Modules returning HTTP 404 (Not found)
#### Modules expected to exist
* `/learn/api/public/v1/courses/{id}/contents/{id}/groups` - Supported since version 3100.5.0,
* `/learn/api/public/v1/courses/{id}/contents/{id}/groups/{id}` - Supported since version 3100.5.0.

#### Other modules
* `/learn/api/public/v1/uploads` - Supported since version 3100.12.0.
* `/learn/api/public/v1/logs/sis/dataSets/{id}` - Supported since version 3200.0.1.

## Conclusion

Only one module has been added with Blackboard learn 3200. For the feature set, this module (`/learn/api/public/v1/logs/sis/dataSets/{id}`) is assumed to fall outside the scope of this application.

The minor release of Blackboard learn 3100.5.0 introduces two content specific modules, 
`/learn/api/public/v1/courses/{id}/contents/{id}/groups` and
`/learn/api/public/v1/courses/{id}/contents/{id}/groups/{id}` regarding content group assignments.
These modules have been not yet been determined to be inside the application scope. The important modules under `/learn/api/public/v1/courses/{id}/contents` are available.

One module is provided with Blackboard learn 3100.12.0, `/learn/api/public/v1/uploads`. Blackboard learn `3100.0.6-rel.3+cd2a24d` does support uploads. This module will have to be reverse-engineered. In order to allow a smooth upgrade path, it should be abstracted to allow switching to the API module when it becomes available.
