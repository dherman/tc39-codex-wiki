var proc = require('child_process');
var EventEmitter = require('events').EventEmitter;

function spawn() {
    var opts = arguments.length > 2
        ? arguments[2]
        : arguments.length > 1 && !Array.isArray(arguments[1])
        ? arguments[1]
        : {};
    return new Proclet(proc.spawn.apply(proc, arguments), opts.encoding || 'utf8');
}

// FIXME: cancel everything on first error

function Proclet(proc, encoding) {
    EventEmitter.call(this);

    proc.stdout.setEncoding(encoding);
    proc.stderr.setEncoding(encoding);

    this.stdin = proc.stdin;
    this.stdout = proc.stdout;
    this.stderr = proc.stderr;

    this._output = "";
    this._error = "";

    this._stdoutEnd = false;
    this._stderrEnd = false;
    this._exitCode = -1;

    var self = this;
    proc.on('error', function(err) {
        self.emit('error', err);
    });
    proc.on('exit', function(exitCode) {
        self._exitCode = exitCode;
        self._checkDone();
    });

    proc.stdout.on('data', function(data) {
        self._output += data;
    });
    proc.stdout.on('error', function(err) {
        self.emit('error', err);
    });
    proc.stdout.on('end', function() {
        self._stdoutEnd = true;
        self._checkDone();
    });

    proc.stderr.on('data', function(data) {
        self._error += data;
    });
    proc.stderr.on('error', function(err) {
        self.emit('error', err);
    });
    proc.stderr.on('end', function() {
        self._stderrEnd = true;
        self._checkDone();
    });
}

Proclet.prototype = Object.create(EventEmitter.prototype);

Proclet.prototype._done = function _done() {
    return this._stdoutEnd && this._stderrEnd && this._exitCode >= 0;
};

Proclet.prototype._checkDone = function _checkDone() {
    if (!this._done()) return;
    this.emit('exit', this._exitCode, this._output, this._error);
};

exports.spawn = spawn;
