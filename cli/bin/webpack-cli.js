const { spawn } = require('child_process');
const path = require('path');
const isWin = process.platform === "win32";

function runWebpack(savePath, title, clientUrl, serverUrl, production) {
  let command;

  if (isWin) {
    command = path.resolve(__dirname, '../node_modules/.bin/webpack.cmd');
  } else {
    command = path.resolve(__dirname, '../node_modules/.bin/webpack');
  }

  let webpackFile;
  if (production) {
    webpackFile = './webpack/webpack.config.js'
  } else {
    webpackFile = './webpack/webpack.dev.config.js'
  }

  const webpack = spawn(command, [
    '--config', webpackFile,
    '--env.title', title,
    '--env.clientUrl', clientUrl,
    '--env.savePath', savePath,
    '--env.serverUrl', serverUrl
  ]);

  webpack.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  webpack.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  webpack.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  webpack.on('error', (error) => {
    console.log(`An error occured`);
    console.log(error);
  })
}

module.exports = runWebpack;
