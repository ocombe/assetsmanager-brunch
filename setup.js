var exec = require('child_process').exec;
var sysPath = require('path');

var mode = process.argv[2];

var execute = function(pathParts, params, callback) {
    if (callback == null) callback = function() {};
    var path = sysPath.join.apply(null, pathParts);
    var command = 'node ' + path + ' ' + params;
    console.log('Executing', command);
    exec(command, function(error, stdout, stderr) {
        if (error != null) return process.stderr.write(stderr.toString());
        process.stdout.write(stdout.toString());
    });
};

if (mode === 'postinstall') {

} else if (mode === 'test') {

}