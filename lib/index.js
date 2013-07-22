var AssetsManager, fs, path, glob;

fs = require('fs-extra');
path = require("path");
glob = require("glob");

module.exports = AssetsManager = (function() {
    AssetsManager.prototype.brunchPlugin = true;

    AssetsManager.prototype.params = {
        files: [],
        paths: {},
        dest: 'assets'
    };

    var extend = function extend(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function(source) {
            for(var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    }

    function AssetsManager(config) {
        if(typeof config.plugins.assetsmanager == 'object') {
            this.params = extend(this.params, config.plugins.assetsmanager, { paths: config.paths });
        }
    }

    AssetsManager.prototype.onCompile = function(generatedFiles) {
        this.copy();
    };

    var copyFile = function copyFile(source, target, cb) {
        fs.copy(source, target, function(err) {
            if(err) {
                console.log('\u001b[31m' + err + '\u001b[0m');
            }
        });
    }

    AssetsManager.prototype.copy = function() {
        var params = this.params;
        var dest = path.join(params.paths.root, params.paths.public, params.dest);
        fs.mkdirsSync(dest);
        for(var i = 0, ilen = params.files.length; i < ilen; i++) {
            var f = path.join(params.paths.root, params.files[i]);
            glob(f, {}, function(err, files) {
                if(err) {
                    console.log('\u001b[31m' + err + '\u001b[0m');
                } else {
                    for(var j = 0, jlen = files.length; j < jlen; j++) {
                        copyFile(files[j], path.join(dest, path.basename(files[j])));
                    }
                }
            })
        }
    }

    return AssetsManager;
})();