var path = require('path');
var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');
var clean = require('gulp-clean');
var babel = require('gulp-babel');

gulp.task('clean', function () {
  gulp.src('./dist', { read: false })
    .pipe(clean());
});

gulp.task('bump', function () {
  var bumpType = process.env.BUMP || 'patch'; // major.minor.patch

  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('tag', ['build', 'bump'], function (done) {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  gulp.src('./')
  	.pipe(git.add())
    .pipe(git.commit(message))
    .on('end', tag);

  function tag () {
    git.tag(v, message);
    git.push('origin', 'master', { args: '--tags' }, function(err) {
    	if( err ) {
    		throw err;
    	}
    	done();
    });
  }
});

gulp.task('build', ['clean'], function() {
	gulp.src('src/mocks.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('release', ['tag']);