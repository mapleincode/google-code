#!/usr/bin/env node

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

let program = require('commander');

program
  .usage('[options] <code ...>')
  .version('0.1.0', '-v, --version')
  .option('-s, --save', 'save code into .gcrc')
  .parse(process.argv);

const homedir = os.homedir();
const configFile = path.resolve(homedir, '.gcrc');
let code;
try {
    code = fs.readFileSync(configFile, { encoding: 'utf8' });
} catch(err) {

}
if(program.args[0]) {
    code  = program.args[0];
    if(program.save) {
        try {
            fs.writeFileSync(configFile, code, { encoding: 'utf8' });
        } catch(err) {
            console.error(err);
        }
    }
}

if(code === null || code === undefined) {
    throw new Error('code must be string');
}

const googleAuth = require('google_authenticator').authenticator;

const nya = new googleAuth();

try {
    console.log(nya.getCode(code));
} catch(err) {
    throw new Error('error code and error getCode');
}



