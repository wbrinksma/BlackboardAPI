# BlackboardAPI

[![Build Status](https://dev.azure.com/BrWProjects/BlackboardAPI%20Builds/_apis/build/status/BlackboardAPI%20Builds-CI)](https://dev.azure.com/BrWProjects/BlackboardAPI%20Builds/_build/latest?definitionId=5)

Master  
[![Build status](https://dev.azure.com/BBReverseEngineering/CI%20Environment/_apis/build/status/CI%20Environment-CI%20Master?branchName=master)](https://dev.azure.com/BBReverseEngineering/CI%20Environment/_build/latest?definitionId=2)

Jan  
[![Build status](https://dev.azure.com/BBReverseEngineering/CI%20Environment/_apis/build/status/CI%20Environment-CI%20Jan)](https://dev.azure.com/BBReverseEngineering/CI%20Environment/_build/latest?definitionId=3)

Klaas Skelte  
[![Build status](https://dev.azure.com/BBReverseEngineering/CI%20Environment/_apis/build/status/CI%20Environment-CI%20KS)](https://dev.azure.com/BBReverseEngineering/CI%20Environment/_build/latest?definitionId=4)

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

> All classes provided by this project are available under `BB`.

### Learn by example

[This repository](https://github.com/Pieterv24/blackboard-webpack-example) is a
useful example on how to use the BlackboardAPI with a minimal webpack.


## TSLint
```
$ npm run lint
```
