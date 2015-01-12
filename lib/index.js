var AssetsManager, fs, path, glob;

fs = require('fs-extra');
path = require('path');
glob = require('glob');

module.exports = AssetsManager = (function() {

    function AssetsManager(config) {
        if(typeof config.plugins.assetsmanager == 'object') {
            this.params = extend(this.params, config.plugins.assetsmanager, { paths: config.paths });
        }
    }

    var fileStatus = {};
    var lastCopyTimestamp = 0;
    var now = function() {
      return 1*new Date();
    };

    AssetsManager.prototype.brunchPlugin = true;

    AssetsManager.prototype.params = {
        copyTo: {},
        paths: {},
        minTimeSpanSeconds: 10
    };

    var extend = function(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function(source) {
            for(var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    };

    AssetsManager.prototype.onCompile = function(generatedFiles) {
        this.copy();
    };

    var copyFile = function(source, target, cb) {
        var field = source + '->' + target;
        if(fileStatus[field] !== 1) {
            fileStatus[field] = 1; // waiting
            fs.copy(source, target, (function(field) {
                return function(err) {
                    fileStatus[field] = 0; // ready
                    if(err) {
                        console.log('\u001b[31m' + err + '\u001b[0m');
                    }
                };
            })(field));
        }
    };

    AssetsManager.prototype.copy = function() {
        var params = this.params;
        if(now() - lastCopyTimestamp >= params.minTimeSpanSeconds * 1000) {
            console.log('performing copy');
            lastCopyTimestamp = now();
            for(var destination in params.copyTo) {
                var dest = path.join(params.paths.root, params.paths.public, destination);
                fs.mkdirsSync(dest);
                for(var i = 0, ilen = params.copyTo[destination].length; i < ilen; i++) {
                    var f = path.join(params.paths.root, params.copyTo[destination][i]);
                    (function (eachDest) {
                        glob(f, {}, function(err, files) {
                            if(err) {
                                console.log('\u001b[31m' + err + '\u001b[0m');
                            } else {
                                for(var j = 0, jlen = files.length; j < jlen; j++) {
                                    copyFile(files[j], path.join(eachDest, path.basename(files[j])));
                                }
                            }
                        });
                    })(dest);
                }
            }
        }
    };

    return AssetsManager;
})();
