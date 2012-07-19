var express = require('express');
var async = require('async');
var path = require('path');
var git = require('./git');
var build = require('./build').build;
var push = require('./build').push;

// Helpers

function goaway(res) {
    res.send("<h1>403 Forbidden</h1>", { 'Content-Type': 'text/html' }, 403);
}

// simple queue that tracks at most one concurrent build request
function BuildQueue(baseURL, sourceURL, cname) {
    this.baseURL = baseURL;       // base URL for site-local absolute URL's
    this.sourceURL = sourceURL;   // URL for GitHub source repo
    this.cname = cname;           // contents of CNAME file for ghpages
    this.building = false;        // build in progress?
    this.pending = null;          // most recent pending build request
}

BuildQueue.prototype.request = function request(name, url) {
    // if there's a build in process, just queue this one up
    if (this.building) {
        this.pending = { name: name, url: url };
        return;
    }

    this.building = true;
    var self = this;
    buildAndPush(name, url, this.baseURL, this.sourceURL, cname, function() {
        self.building = false;

        // perform the pending build
        if (self.pending) {
            var pending = self.pending;
            self.pending = null;
            self.request(pending.name, pending.url);
        }
    });
};

var rootDir = path.join(__dirname, "..");
var ghpagesDir = path.join(rootDir, "gh-pages");

function buildAndPush(name, url, baseURL, sourceURL, cname, cb) {
    var message = "push by " + name + ": " + url;

    console.log(message);

    console.log("master branch at:  " + rootDir);
    console.log("ghpages branch at: " + ghpagesDir);

    async.series([
        // git pull (master branch)
        function(cb) {
            git(rootDir).pull(cb);
        },

        // git pull (gh-pages branch)
        function(cb) {
            git(ghpagesDir).pull(cb);
        },

        // build static pages
        function(cb) {
            build(baseURL, sourceURL, cb);
        },

        // push to gh-pages
        function(cb) {
            push(message, cname, cb);
        }
    ], cb);
}

function webhook(port, githubWebhookIPAddresses, baseURL, sourceURL, cname) {
    var app = module.exports = express.createServer();

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

    var queue = new BuildQueue(baseURL, sourceURL, cname);

    app.get('/', function(req, res) {
        goaway(res);
    });

    app.post('/', function(req, res) {
        // only accept posts from GitHub
        if (githubWebhookIPAddresses.indexOf(req.connection.remoteAddress) === -1) {
            goaway(res);
            return;
        }

        var payload = JSON.parse(req.body.payload);

        if (payload.ref === "refs/heads/master")
            queue.request(payload.pusher.name, payload.compare);

        res.send('OK', { 'Content-Type': 'text/plain' }, 200);
    });

    app.listen(Number(port), function(){
        console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
    });
}

module.exports = webhook;
