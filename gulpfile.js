'use strict';

var gulp = require('gulp');

gulp.task('css', function() {
	var libSass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer');

	return gulp.src('source/assets/css/main.scss')
	.pipe(libSass.sync({
			includePaths: ['source/assets/css/settings/', 'source/assets/css/modules/']
		}))
	.pipe(autoprefixer('last 2 version'))
	.pipe(gulp.dest('dist/assets'));
});

gulp.task('js', function() {
	var browserify = require('browserify'),
		source = require('vinyl-source-stream');

	return browserify('source/assets/js/main.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('dist/assets/'));
});

gulp.task('htmlcopy', function() {
	return gulp.src(['source/*.html', 'source/app/**/*.html'], {
			base: './source'
		})
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	var watch = require('gulp-watch');

	watch('source/assets/css/**/*.scss', {}, function() {
		gulp.start('css');
	});

	watch(['source/assets/css/**/*.js', 'app/**/*.js'], {}, function() {
		gulp.start('js');
	});

	watch('source/app/**/*.html', {}, function() {
		gulp.start('htmlcopy');
	});
});

gulp.task('default', function() {
	var http = require('http'),
		runSequence = require('run-sequence'),
		serveStatic = require('serve-static'),
		finalhandler = require('finalhandler');

	return runSequence(['css', 'js'], 'htmlcopy', 'watch', function () {
		var serve = serveStatic('./dist', {'index': ['index.html']});

		var server = http.createServer(function(req, res){
			var done = finalhandler(req, res);
			serve(req, res, done);
		});

		server.listen(3000);
	});
});