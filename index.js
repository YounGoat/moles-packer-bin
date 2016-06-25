/**
 * API agent of moles-packer.
 * @author jiangjing(YounGoat)
 */

'use strict';
var MODULE_REQUIRE
    , child_process = require('child_process')
    , fs = require('fs')
    , path = require('path')
    ;

var _readkey = function() {
    var changeMode = !process.stdin.isRaw;

    // What happen on raw mode?
    // 1. Auto-echo on stdout will be disabled.
    // 2. Data will be piped out char by char, instead of line by line.
    if (changeMode) process.stdin.setRawMode(true);

    var buf = new Buffer(1);
    fs.readSync(
        /*fd*/ process.stdin.fd,
        /*buffer that the data will be written to*/ buf,
        /*offset in the buffer*/ 0,
        /*number of bytes to read*/ 1,
        /*where to begin readinng from in the file*/ null
        );

    if (changeMode) process.stdin.setRawMode(false);

    return buf.toString('utf8');
};

var SHADOWN_NAME = 'moles-packer';

var mp;
try {
    mp = require(SHADOWN_NAME);
    console.log();
    console.log('-- ATTENTION --')
    console.log('moles-packer-bin is a binary edition of moles-packer.');
    console.log('It is strongly recommended to use require("moles-packer") directly instead of using require("moles-packer-bin") .');
    console.log();
} catch(ex) {
    var TARGET_DIRNAME = path.join(__dirname, 'node_modules', SHADOWN_NAME);

    console.log();
    console.log('-- ATTENTION --')
    console.log('moles-packer-bin is a binary edition of moles-packer.');
    console.log('If you wanna use functions of Moles Packer via API in Node.js,');
    console.log('please install moles-packer.');
    console.log();

    console.log('It is suppposed to installed at: ');
    console.log('    ' + TARGET_DIRNAME);
    process.stdout.write('Do you want to install moles-packer now? [y/n]');
    var key = _readkey();
    console.log(); // End line.
    console.log(); // Create a space line.

    if (key == 'y') {
        console.log('Begin to install moles-packer ...');
        try {
            child_process.execSync('npm install ' + SHADOWN_NAME, {
                cwd: __dirname,
                stdio: [ null, process.stdout ]
            });
            mp = require(SHADOWN_NAME);
        } catch(ex) {
            console.log('Failed to install or require moles-packer.');
            console.log(ex);
        }
    }
}

module.exports = mp;
