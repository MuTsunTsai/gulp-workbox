"use strict";
const workbox = require("workbox-build");
const through2 = require("gulp-through2");
module.exports = function (options) {
    const injectionPoint = options.injectionPoint || "self.__WB_MANIFEST";
    delete options.injectionPoint;
    return through2({
        name: 'gulp-workbox',
        transform: async (content) => {
            const result = await workbox.getManifest(options);
            const manifest = JSON.stringify(result.manifestEntries);
            return content.replace(injectionPoint, manifest);
        },
    });
};
