var Project = require('codex/lib/codex/project');
var connect = require('connect');
var path = require('path');

var opts = require('optimist')
    .usage("Usage: $0 [-p num]")
    .default('p', 8888)
    .alias('p', 'port')
    .describe('p', 'server port');

if (opts.argv.h || opts.argv.help) {
    opts.showHelp();
    process.exit();
}

var rootDir = path.join(__dirname, "..");
var outDir = path.join(rootDir, "out");
var dataDir = path.join(rootDir, "data");
var templateDir = path.join(rootDir, "template");

function build(cb) {
    var project = new Project({
        inDir: rootDir,
        outDir: outDir,
        dataDir: dataDir,
        templateDir: templateDir
    });
    project.on("error", cb);
    project.build(cb);
}

function serve(port) {
    var app = connect();
    app.use(connect.static(outDir));
    app.use(connect.directory(outDir));
    app.listen(port);
    console.log("Wiki server running on port " + port);
    app.on('error', function(err) {
        console.error("Error: " + err);
    });
}

build(function(err) {
    if (err) {
        console.error("Build failed: " + err.message);
        process.exit(1);
    }
    serve(Number(opts.argv.port));
});
