# Blackboard API compatibility
During development, the targeted Blackboard version switched from the outdated 3100 Blackboard learn to a newer, (but still slightly outdated) 3400 Blackboard learn. Due to the unusual way of versioning and api module management, Blackboard API might work on Blackboard installations older than 3400, though some functionality might not be available.

## Report for `3100.0.6-rel.3+cd2a24d`

Currently, Blackboard API targets Blackboard learn `3100.0.6-rel.3+cd2a24d`, with newer versions being potentially supported.
Unfortunately, the earliest supported version of Blackboard is [3200.0.8](https://developer.blackboard.com/portal/displayApi).
Below is the compatibility report for Blackboard learn `3100.0.6-rel.3+cd2a24d`, compared against the API overview of [Blackboard learn 3200.0.8](https://developer.blackboard.com/portal/docs/apis/learn-swagger-3200.0.8.json).

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

## Report for `3400.0.4.a1c490e`

All expected modules exist, and a lot of modules from version `3500.3.0` exist, despite not being listed in the documentation. Note that said [documentation](https://developer.blackboard.com/portal/displayApi/Learn?version=3400.0.0) contains a typo for the modules under `lti`: the urls for the `lti/domains` and `lti/domains/{id}` are `/learn/api/public/v1/lti/domains` and `/learn/api/public/v1/lti/domains/{id}` respectively.

### Modules that should not exist
* `/learn/api/public/v1/calendars` - Supported since version 3400.9.0.
* `/learn/api/public/v1/calendars/items` - Supported since version 3400.9.0.
* `/learn/api/public/v1/calendars/{type}/{id}` - Supported since version 3400.9.0.
* `/learn/api/public/v1/courses/{id}/contents{id}/attachments` - Using the POST HTTP verb is supported since version `3400.9.0`.
* `/learn/api/public/v1/courses/{id}/contents{id}/attachments/{id}` - Using the DELETE HTTP verb is supported since version `3400.9.0`.
* `/learn/api/public/v1/courses/{id}/gradebook/attempts/{id}/files` - Supported since version 3400.6.0.
* `/learn/api/public/v1/courses/{id}/gradebook/attempts/{id}/files/{id}` - Supported since version 3400.6.0, with the DELETE HTTP verb supported since 3500.2.0.
* `/learn/api/public/v1/courses/{id}/gradebook/attempts/{id}/files/{id}/download` - Supported since version 3400.6.0.
* `/learn/api/public/v1/courses/{id}/gradebook/categories` - Supported since 3400.2.0.
* `/learn/api/public/v1/courses/{id}/gradebook/categories/{id}` - Supported since 3400.2.0.

## Conclusion

The missing module for uploads is now included, and a lot of other modules regarding grades are now available. This should simplify the implementation for such functionality.

Additionally, the modules included from newer Blackboard learn versions cover some useful functionality. Depending on the requirements, these allow for a large increase in feature compatibility in a relatively short time frame.
