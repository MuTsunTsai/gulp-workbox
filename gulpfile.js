let gulp = require('gulp');
let ts = require('gulp-typescript');
let newer = require('gulp-newer');

let project = ts.createProject("tsconfig.json");
gulp.task('default', () =>
	project.src()
		.pipe(newer('dist'))
		.pipe(project())
		.pipe(gulp.dest('dist'))
);
