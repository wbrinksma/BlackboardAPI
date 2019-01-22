#! /usr/bin/env node

const path = require('path');

(function() {
    const yargs = require('yargs')
    .usage('usage: $0 <command>')
    .command('create [path]', 'create server files', (yargs) => {
        yargs.positional('path', {
            describe: 'path to output generated files',
            type: 'string',
            default: '.'
        });
        yargs.option('t', {
            alias: 'title',
            demandOption: true,
            default: 'Apploader',
            describe: 'set title of the apploader',
            type: 'string'
        });
        yargs.option('c', {
            alias: 'clientUrl',
            demandOption: true,
            default: 'https://localhost:9000',
            describe: 'set from which url the apploader should load the client'
        });
        yargs.option('s', {
            alias: 'serverUrl',
            describe: 'define where the server.js file for the apploader is located'
        });
        yargs.option('p', {
            alias: 'production',
            describe: 'get production files',
            type: 'boolean',
            default: false
        });
    }, (argv) => {
        let savePath = path.resolve(process.cwd(), argv.path);
        require('./webpack-cli')(savePath, argv.title, argv.clientUrl, argv.serverUrl, argv.production);
    })
    .help('help')
    .alias('h', 'help')
    .version('version')
    .alias('v', 'version');

    yargs.getOptions().boolean.splice(-2);

    yargs.argv;
})()