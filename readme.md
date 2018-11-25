# BlackboardAPI

[![Build Status](https://dev.azure.com/BrWProjects/BlackboardAPI%20Builds/_apis/build/status/BlackboardAPI%20Builds-CI)](https://dev.azure.com/BrWProjects/BlackboardAPI%20Builds/_build/latest?definitionId=5)

An API to communicate with a Blackboard server. This can be used to build apps on the Blackboard platform that can either be hosten on-site or off-site through the use of special loaders.

This project is still in its infancy, meaning that it will not work fully until a stable release is published.

In this state, the build process uses a makefile which in turn uses npm and the Typescript compiler with seperate configuration files. This might change in the future.

## Project structure

- All definitions in the `api` folder are used by a client/UI.

- `BBIframeBackend.ts` redirects all calls from the client/UI to
`BBNativeBackend.ts`.

- `BBNativeBackend.ts` contains all the logic to manage HTTP Requests to the
actual BlackboardAPI. Once the request has been successful, the response will be
stored in a specific object defined by `BBBackend.ts` as interface.

- `BBBackend.ts` has an abstract class in which the method signatures are
defined and documented. The file also has interfaces that are used to structure
the responses from `BBNativeBackend.ts`.

## Building

### UNIX

For first run:

```
npm i && npm run build
```

After first run:

```
npm run build
```
