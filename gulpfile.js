let gulp = require('gulp');
let ts = require('gulp-typescript');
let ifAnyNewer = require('gulp-if-any-newer');

let project = ts.createProject("tsconfig.json");
gulp.task('build', () =>
	project.src()
		.pipe(ifAnyNewer('dist'))
		.pipe(project())
		.pipe(gulp.dest('dist'))
);
