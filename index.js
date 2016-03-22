'use strict';

const 	dust = require('dustjs-helpers'),
		glob = require('glob'),
		path = require('path'),
		fs 	 = require('fs-extra');

//If you want the html minified, put false
dust.config.whitespace = true;

//Get all templates from folder
let files = glob.sync("./dustTemplates/*.tl");

//Loop trough each file
files.forEach(function(file, index) {
	//Lets define a key to associate the file content
	let key = file.replace(path.extname(file), '');

	//Grab the content
	let content = fs.readFileSync(file, 'utf-8');

	//Compile
	let compiled = dust.compile(content, key);

	// Register the template
	dust.loadSource(compiled);

	//Okay, lets render the html
	dust.render(key, {}, (err, content) => {
		//Output the file
		fs.outputFileSync('build/'+path.basename(key)+'.html', content);
	});
});