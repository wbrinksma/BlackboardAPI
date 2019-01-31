|package|version|status|
|-------|-------|------|
|blackboardlib|[![LatestVersion](https://img.shields.io/npm/v/blackboardlib/latest.svg)]()|[![Build Status](https://dev.azure.com/BBReverseEngineering/BlackboardLib%20CI/_apis/build/status/BlackboardLib%20Build%20Library?branchName=master)](https://dev.azure.com/BBReverseEngineering/BlackboardLib%20CI/_build/latest?definitionId=12&branchName=master)|
|blackboardlib-cli|[![LatestVersion](https://img.shields.io/npm/v/blackboardlib-cli/latest.svg)]()|[![Build Status](https://dev.azure.com/BBReverseEngineering/BlackboardLib%20CI/_apis/build/status/BlackboardLib%20Build%20CLI?branchName=master)](https://dev.azure.com/BBReverseEngineering/BlackboardLib%20CI/_build/latest?definitionId=11&branchName=master)|

# The BlackboardLib-CLI

> This shows how to generate server files for a (web)server.

First, the setup:

```
npm install --global blackboardlib-cli
```

Then, generating the server files:

> In replace the <url> with the url-path to your webserver (or run locally by
> replacing <url> with 'localhost').  

> https is required due to restrictions on the side of blackboard

```bash
# Go to the directory you want the server files in
blackboardlib-cli create ./serverfiles -c https://<url> -s https://<url>/server.js
```

> For more help, run `blackboardlib-cli --help` in your terminal.