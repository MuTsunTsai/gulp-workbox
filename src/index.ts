import stream = require('stream');
import workbox = require('workbox-build');
import through2 = require('../../gulp-through2/dist');

export = function(options: WorkboxOptions): stream.Transform {
	const injectionPoint = options.injectionPoint || "self.__WB_MANIFEST";
	delete options.injectionPoint;

	return through2({
		name: 'gulp-workbox',
		transform: async content => {
			const result = await workbox.getManifest(options);
			const manifest = JSON.stringify(result.manifestEntries);
			return content.replace(injectionPoint, manifest);
		},
	});
}

type WorkboxOptions = workbox.GetManifestOptions & {
	injectionPoint?: string;
};
