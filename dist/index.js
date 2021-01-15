"use strict";
const through = require("through2");
const PluginError = require("plugin-error");
const workbox = require("workbox-build");
module.exports = function (config) {
    function transform(file, encoding, callback) {
        if (file.isNull())
            return callback(null, file);
        if (file.isStream())
            return callback(new PluginError('gulp-workbox', 'Streaming not supported'));
        encoding = encoding || 'utf8';
        let content = file.contents.toString(encoding || 'utf8');
        let injectionPoint = config.injectionPoint || "self.__WB_MANIFEST";
        delete config.injectionPoint;
        workbox.getManifest(config).then(result => {
            let manifest = JSON.stringify(result.manifestEntries);
            let output = content.replace(injectionPoint, manifest);
            file.contents = Buffer.from(output, encoding);
            callback(null, file);
        });
    }
    return through.obj(transform);
};
