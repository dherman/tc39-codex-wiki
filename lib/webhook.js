var express = require('express');
var cjson = require('cjson');
var Project = require('codex/lib/codex/project');
var path = require('path');
var fs = require('fs');
var proc = require('child_process');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var async = require('async');
var git = require('gift');

var app = module.exports = express.createServer();

// Configuration

ncp.limit = 16;

var config = require('cjson').load(__dirname + '/webhook.cjson');

var ghpagesDir = cjson.replace(config.branch, process.env);
var rootDir = path.join(__dirname, "..");
var outDir = path.join(rootDir, "out");
var dataDir = path.join(rootDir, "data");
var templateDir = path.join(rootDir, "template");

app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Helpers

function goaway(res) {
    res.send("<h1>403 Forbidden</h1>", { 'Content-Type': 'text/html' }, 403);
}

function spawnGit(args, opts, cb) {
    proc.spawn("git", args, opts)
        .on('exit', function(exitcode) {
            cb(exitCode === 0 ? null : new Error(args.join(" ") + " failed"));
        });
}

// create a git repo augmented with push/pull
function repo(dir) {
    var repo = git(dir);
    repo.pull = function pull(cb) {
        spawnGit(["pull"], { cwd: this.dir }, cb);
    };
    repo.push = function push(branch, cb) {
        spawnGit(["push", "origin", branch], { cwd: this.dir }, cb);
    };
    return repo;
}

function ls(dir, cb) {
    fs.readdir(dir, function(err, files) {
        if (err) return cb(err);
        cb(null, files.filter(function(file) {
            return file[0] !== '.';
        }).map(function(file) {
            return path.join(dir, file);
        }));
    });
}

// Builds

var master = repo(__dirname);
var ghpages = repo(ghpagesDir);

function build(name, url, oncomplete) {
    var message = "push by " + name + ": " + url;
    console.log(message);

    async.waterfall([
        // git pull
        function(cb) {
            master.pull(cb);
        },

        // git pull
        function(cb) {
            ghpages.pull(cb);
        },

        // codex build
        function(cb) {
            var project = new Project({
                inDir: rootDir,
                outDir: outDir,
                dataDir: dataDir,
                templateDir: templateDir
            });

            project.on("error", cb);
            project.build(cb);
        },

        // ls <ghpages>
        function(cb) {
            ls(ghpagesDir, cb);
        },

        // cp -R data/* <ghpages>/
        function(files, cb) {
            async.forEachSeries(files, function(file, cb) {
                ncp(file, ghpagesDir, cb);
            }, cb);
        },

        // git status
        function(cb) {
            ghpages.status(cb);
        },

        // filter added/removed files
        function(status, cb) {
            var add = [], rm = [];
            for (var filename in status) {
                if (!{}.hasOwnProperty.call(status, filename))
                    continue;
                var file = status[filename];
                if (!file.tracked || file.type === 'M')
                    add.push(filename);
                else
                    rm.push(filename);
            }
            async.series([
                // git rm
                function(cb) {
                    ghpages.remove(rm, cb);
                },
                // git add
                function(cb) {
                    ghpages.add(add, cb);
                },
                // git commit
                function(cb) {
                    ghpages.commit(message, cb);
                },
                // git push origin gh-pages
                function(cb) {
                    ghpages.push("gh-pages", cb);
                }
            ], cb);
        }
    ], oncomplete);
}

// simple queue that tracks at most one concurrent build request
function BuildQueue() {
    this.building = false; // build in progress?
    this.pending = null;   // most recent pending build request
}

BuildQueue.prototype.request = function request(name, url) {
    // if there's a build in process, just queue this one up
    if (this.building) {
        this.pending = { name: name, url: url };
        return;
    }

    this.building = true;
    var self = this;
    build(name, url, function() {
        self.building = false;

        // perform the pending build
        if (self.pending) {
            var pending = self.pending;
            self.pending = null;
            self.request(pending.name, pending.url);
        }
    });
};

var queue = new BuildQueue();

// Routes

app.get('/', function(req, res) {
    goaway(res);
});

app.post('/', function(req, res) {
    // only accept posts from GitHub
    if (config.github.indexOf(req.connection.remoteAddress) === -1) {
        goaway(res);
        return;
    }

    var payload = JSON.parse(req.body.payload);
    queue.request(payload.pusher.name, payload.compare);
    res.send('OK', { 'Content-Type': 'text/plain' }, 200);
});

app.listen(Number(config.port), function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
