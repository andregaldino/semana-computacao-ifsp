var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var imagemin = require('gulp-imagemin');

gulp.task('default', ['sass', 'js', 'images']);

gulp.task('watch', function() {
	gulp.watch('./dev/styles/**/*', ['sass']);
	gulp.watch('./dev/scripts/**/*', ['js']);
});

gulp.task('fonts', function() {
	return gulp.src(['./dev/fonts/**'])
	.pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('sass', function() {
	sass('./dev/styles/sass/ifsp.scss')
	.on('error', sass.logError)
	// .pipe(uglifycss())
	// .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/css/'));
});

gulp.task('jslib', function() {
	return gulp.src(['./node_modules/jquery/dist/jquery.js', 
		'./node_modules/gsap/src/uncompressed/easing/EasePack.js', 
		'./node_modules/gsap/src/uncompressed/TweenLite.js', 
		'./node_modules/fullpage.js/dist/jquery.fullpage.js',
		'./node_modules/typeit/dist/typeit.js',])
	.pipe(concat('lib.js'))
	// .pipe(uglify())
	// .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/js/'));
});

gulp.task('csslib', function() {
	return gulp.src(['./node_modules/fullpage.js/dist/jquery.fullpage.css'])
	.pipe(concat('lib.css'))
	// .pipe(uglify())
	// .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function() {
	return gulp.src(['./dev/scripts/maps.js', './dev/scripts/ifsp.js'])
	.pipe(concat('ifsp.js'))
	// .pipe(uglify())
	// .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/js/'));
});

gulp.task('images', function() {
	gulp.src('./dev/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/images/'));
});