import stream = require('stream');
import workbox = require('workbox-build');
declare const _default: (options: WorkboxOptions) => stream.Transform;
export = _default;
type WorkboxOptions = workbox.GetManifestOptions & {
    injectionPoint?: string;
};
