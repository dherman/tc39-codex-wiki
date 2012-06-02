var connect = require('connect');
var path = require('path');

var outDir = path.join(__dirname, "..", "out");

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

module.exports = serve;
