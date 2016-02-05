'use strict';

var gulp = require('gulp');

gulp.task('css', function() {
	var libSass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer');

	return gulp.src('assets/source/css/*.scss')
	.pipe(libSass.sync())
	.pipe(autoprefixer('last 2 version'))
	.pipe(gulp.dest('assets/dist'));
});

gulp.task('js', function() {
	var browserify = require('browserify'),
		source = require('vinyl-source-stream');

	return browserify('assets/source/js/main.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('assets/dist'));
});

gulp.task('watch', function() {
	var watch = require('gulp-watch');

	watch('assets/source/css/*.scss', {}, function() {
		gulp.start('css');
	});

	watch(['assets/source/css/*.js', 'app/{**/}*.js'], {}, function() {
		gulp.start('js');
	});
});

gulp.task('default', function() {
	var http = require('http'),
		runSequence = require('run-sequence'),
		serveStatic = require('serve-static'),
		finalhandler = require('finalhandler');

	return runSequence(['css', 'js'], 'watch', function () {
		var serve = serveStatic('./', {'index': ['index.html']});

		var server = http.createServer(function(req, res){
			var done = finalhandler(req, res);
			serve(req, res, done);
		});

		server.listen(3000);
	});
});