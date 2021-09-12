>This repository is not actively maintained anymore and is therefore archived.

|package|version|status|
|-------|-------|------|
|blackboardlib|[![LatestVersion](https://img.shields.io/npm/v/blackboardlib/latest.svg)]()|[![Build Status](https://dev.azure.com/BBReverseEngineering/BlackboardLib%20CI/_apis/build/status/BlackboardLib%20Build%20Library?branchName=master)](https://dev.azure.com/BBReverseEngineering/BlackboardLib%20CI/_build/latest?definitionId=12&branchName=master)|
|blackboardlib-cli|[![LatestVersion](https://img.shields.io/npm/v/blackboardlib-cli/latest.svg)]()|[![Build Status](https://dev.azure.com/BBReverseEngineering/BlackboardLib%20CI/_apis/build/status/BlackboardLib%20Build%20CLI?branchName=master)](https://dev.azure.com/BBReverseEngineering/BlackboardLib%20CI/_build/latest?definitionId=11&branchName=master)|

# BlackboardAPI

An API to communicate with a Blackboard server. This can be used to build apps on the Blackboard platform that can either be hosten on-site or off-site through the use of special loaders.

This project is still in its infancy, meaning that it will not work fully until a stable release is published.

In the meantime you should be able to use the current product, however be aware of possible bugs.

## Getting started

### Documentation

To get started, these markdown files are probably of use:

- [The structure of the code](docs/project_structure.md)

- [How to create an assignment column using the API](docs/column_example.md)

- [How to send emails to course members using the API](docs/email.md)

- [Using the Blackboard CLI](docs/cli.md)

### Building
```
$ npm i # First run only
$ npm run build
```

### Usage
This library is available as NPM package.
Please refer to the examples to see how to use the library.

### Learn by example

[React-Example](https://github.com/Pieterv24/blackboard-webpack-example) is a
useful example on how to use the BlackboardAPI with a minimal webpack in react.

[Webpack-Example](https://github.com/Pieterv24/blackboard-webpack-example) is a
useful example on how to use the BlackboardAPI with a minimal webpack configuration.


## TSLint
```
$ npm run lint
```
