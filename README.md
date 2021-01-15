# gulp-workbox

> Gulp plugin for injecting workbox manifest.

This plugin is especially useful if you need to build the `sw.js` first (perhaps by TypeScript) and then inject the manifest in a single flow.

## License

MIT &copy; Mu-Tsun Tsai 2021

## Install

```bash
npm install workbox-build gulp-workbox -save-dev
```

Notice that [workbox-build](https://www.npmjs.com/package/workbox-build) is deliberately installed separately.

## Usage

```javascript
var gulp = require('gulp');
var workbox = require('gulp-workbox');

gulp.task('build', () =>
	gulp.src('src/sw.js')
		.pipe(workbox({
			globDirectory: 'dist',
			globPatterns: [
				'**/*.htm',
				'**/*.js',
				'**/*.css',
			],
			globIgnores: ['sw.js']
		}))
		.pipe(gulp.dest('dist'))
);
```

The options are the same as those of the [`getManifest()`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.getManifest) method, plus an optional string `injectionPoint` (whose default value is `"self.__WB_MANIFEST"`);
