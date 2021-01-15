import stream = require('stream');
import workbox = require('workbox-build');
declare const _default: (config: WorkboxConfig) => stream.Transform;
export = _default;
declare type WorkboxConfig = workbox.GetManifestConfig & {
    injectionPoint?: string;
};
