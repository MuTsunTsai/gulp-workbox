import through = require('through2');
import stream = require('stream');
import File = require('vinyl');
import PluginError = require('plugin-error');
import workbox = require('workbox-build');

export = function(config: WorkboxConfig): stream.Transform {
	function transform(this: stream.Transform, file: File, encoding: BufferEncoding, callback: through.TransformCallback) {
		if(file.isNull()) return callback(null, file);
		if(file.isStream()) return callback(new PluginError('gulp-workbox', 'Streaming not supported'));
		encoding = encoding || 'utf8';
		let content = file.contents!.toString(encoding || 'utf8');
		let injectionPoint = config.injectionPoint || "self.__WB_MANIFEST";
		delete config.injectionPoint;

		workbox.getManifest(config).then(result => {
			let manifest = JSON.stringify((result as any).manifestEntries);
			let output = content.replace(injectionPoint, manifest);
			file.contents = Buffer.from(output, encoding);
			callback(null, file);
		});
	}
	return through.obj(transform);
}

type WorkboxConfig = workbox.GetManifestConfig & {
	injectionPoint?: string;
}
