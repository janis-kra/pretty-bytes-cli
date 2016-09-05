#!/usr/bin/env node
'use strict';
const meow = require('meow');
const getStdin = require('get-stdin');
const prettyBytes = require('pretty-bytes');
const prettyKibiBytes = require('pretty-kibi-bytes');

const cli = meow(`
	Usage
	  $ pretty-bytes <number>
	  $ echo <number> | pretty-bytes
		$ pretty-bytes --kibi <number>

	Example
	  $ pretty-bytes 1337
	  1.34 kB
		$ pretty-bytes --kibi 1337
		1.31 kiB
`);

const input = cli.input[0];

const kibi = cli.flags.kibi;

function init(input, kibi) {
	const bytes = kibi ? prettyKibiBytes : prettyBytes;
	console.log(bytes(Number(input)));
}

if (!input && process.stdin.isTTY) {
	console.error('Specify a number');
	process.exit(1);
}

if (input) {
	init(input, kibi);
} else {
	getStdin().then(init, kibi);
}
