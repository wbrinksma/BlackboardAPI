# The BlackboardAPI CLI

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
