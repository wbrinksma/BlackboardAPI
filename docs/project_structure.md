> This article describes how the structure of the project is set up and how
> the code (variables, classes and functions) interoperates.

- All definitions in the `api` folder are used by a client/UI.

- `BBIframeBackend.ts` redirects all calls from the client/UI to
`BBNativeBackend.ts`.

- `BBNativeBackend.ts` contains all the logic to manage HTTP Requests to the
actual BlackboardAPI. Once the request has been successful, the response will be
stored in a specific object defined by `BBBackend.ts` as interface.

- `BBAbstractBBackend.ts` has abstract classes in which the method signatures
are defined and documented. The file also has interfaces that are used to
structure the responses from `BBNativeBackend.ts`.

- `index.d.ts` is filled with:
	* Types. Each `type` is used as a parameter to make sure the right information
  is provided to Backend functions.
	* Interfaces. An `interface` serves as a definition of the object that will be
  returned by Backend functions.
