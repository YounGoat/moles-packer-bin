#!/usr/bin/env node

var fs = require('fs');
var os = require('os');
var path = require('path');

var BIN_NAMES = {
	'Darwin': 'bin/output-mac',
	'Windows_NT': 'bin/output-win.exe',
	'Linux': 'bin/output-linux'
};

var BIN_TARGET = 'bin/output';

var ostype = os.type(), found = false;
for (var type in BIN_NAMES) {
	var source = path.join(__dirname, BIN_NAMES[type]);
	var target = path.join(__dirname, BIN_TARGET) + path.extname(source);

	if (type == ostype) {
		fs.unlinkSync(target);
		fs.renameSync(source, target);
        found = true;
	}
	else {
		fs.unlinkSync(source);
	}
}
if (!found) {
    console.log('Binary command file ready.');
}
else {
    console.error('OS type "' + ostype + '" is not supported.');
    process.exit(1);
}
