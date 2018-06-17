/*global module:false*/
module.exports = function(grunt) {
    const sgc  = require('../../sharedGruntConfig')(grunt, __dirname, ['hsLayout', 'hsWidget', 'hsGraph', 'hsdatab', 'hsUtil'], 'app');
	grunt.initConfig(sgc); 
};
