# BlackboardAPI

An API to communicate with a Blackboard server. This can be used to build apps on the Blackboard platform that can either be hosten on-site or off-site through the use of special loaders.

This project is still in its infancy, meaning that it will not work fully until a stable release is published.

In this state, the build process uses a makefile which in turn uses npm and the Typescript compiler with separate configuration files. This might change in the future.

## Getting started

### Documentation

To get started, these markdown files are propbably of use:

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
