var path = require('path');
var gift = require('gift'); // buggy, so just using it for `git status`
var spawn = require('./proclet').spawn;

function git(args, opts, cb) {
    spawn("git", args, opts).on('exit', function(exitCode, out, err) {
        cb(exitCode === 0 ? null : new Error(args.join(" ") + " failed: " + err.trim()));
    });
}

function Repo(dir) {
    var giftRepo = gift(dir);
    return {
        pull: function pull(cb) {
            git(["pull"], { cwd: dir }, cb);
        },
        push: function push(remote, branch, cb) {
            git(["push", remote, branch], { cwd: dir }, cb);
        },
        add: function add(files, cb) {
            if (files.length === 0) return cb();
            git(["add"].concat(files), { cwd: dir }, cb);
        },
        rimraf: function rimraf(files, cb) {
            if (files.length === 0) return cb();
            git(["rm", "-rf"].concat(files), { cwd: dir }, cb);
        },
        commit: function commit(message, cb) {
            git(["commit", "-m", message], { cwd: dir }, cb);
        },
        clone: function clone(url, cb) {
            git(["clone", url, path.basename(dir)], { cwd: path.dirname(dir) }, cb);
        },
        checkout: function checkout(branch, cb) {
            git(["checkout", branch], { cwd: dir }, cb);
        },
        status: function status(cb) {
            return giftRepo.status(cb);
        }
    };
}

module.exports = Repo;
