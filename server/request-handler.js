/*************************************************************

 You should implement your request handler function in this file.

 requestHandler is already getting passed to http.createServer()
 in basic-server.js, but it won't work as is.

 You'll have to figure out a way to export this function from
 this file and include it in basic-server.js so that it actually works.

 *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

 **************************************************************/
var _storage = [];
var fs = require('fs');

exports.requestHandler = function (request, response) {
    // Request and Response come from node's http module.
    //
    // They include information about both the incoming request, such as
    // headers and URL, and about the outgoing response, such as its status
    // and content.
    //
    // Documentation for both request and response can be found in the HTTP section at
    // http://nodejs.org/documentation/api/
    // Do some basic logging.
    //
    // Adding more logging to your server can be an easy way to get passive
    // debugging help, but you should always be careful about leaving stray
    // console.logs in your code.

    if (request.method === 'OPTIONS') {
        var headers = defaultCorsHeaders;
        var statusCode = 200;
        response.writeHead(statusCode, headers);
        response.end();
    }

    if (request.method === 'GET') {
        if (request.url.slice(0, 8) === '/classes') {
            console.log("Serving request type " + request.method + " for url " + request.url);
            var statusCode = 200;
            var headers = defaultCorsHeaders;
            headers['Content-Type'] = "application/json";
            response.writeHead(statusCode, headers);
            console.log('reponse', JSON.stringify({results: _storage}));
            response.end(
                JSON.stringify({results: _storage})
            );
        } else if (request.url === '/') {
            //serve the front end app
            console.log("Serving request type " + request.method + " for url " + request.url);
            var statusCode = 200;
            var headers = defaultCorsHeaders;
            headers['Content-Type'] = "text/html";
            response.writeHead(statusCode, headers);
            fs.readFile('/Users/student/Ron/2015-11-chatterbox-server/server/index.html', 'utf8', function (err, html) {
                console.log('error', err);
                console.log(html);
                response.write(html);
                response.end();
            });
        } else if (request.url === '/app.js') {
            console.log("Serving request type " + request.method + " for url " + request.url);
            var statusCode = 200;
            var headers = defaultCorsHeaders;
            headers['Content-Type'] = "application/javascript";
            response.writeHead(statusCode, headers);
            fs.readFile('/Users/student/Ron/2015-11-chatterbox-server/client/client/scripts/app.js', 'utf8', function (err, js) {
                console.log('error', err);
                console.log(js);
                response.write(js);
                response.end();
            });
        } else if (request.url === '/config.js') {
            console.log("Serving request type " + request.method + " for url " + request.url);
            var statusCode = 200;
            var headers = defaultCorsHeaders;
            headers['Content-Type'] = "application/javascript";
            response.writeHead(statusCode, headers);
            fs.readFile('/Users/student/Ron/2015-11-chatterbox-server/client/client/env/config.js', 'utf8', function (err, js) {
                console.log('error', err);
                console.log(js);
                response.write(js);
                response.end();
            });
        } else if (request.url === '/styles.css') {
            console.log("Serving request type " + request.method + " for url " + request.url);
            var statusCode = 200;
            var headers = defaultCorsHeaders;
            headers['Content-Type'] = "text/css";
            response.writeHead(statusCode, headers);
            fs.readFile('/Users/student/Ron/2015-11-chatterbox-server/client/client/styles/styles.css', 'utf8', function (err, css) {
                console.log('error', err);
                console.log(css);
                response.write(css);
                response.end();
            });
        } else if (request.url === '/spiffygif_46x46.gif') {
            console.log("Serving request type " + request.method + " for url " + request.url);
            var statusCode = 200;
            var headers = defaultCorsHeaders;
            headers['Content-Type'] = "image/gif";
            response.writeHead(statusCode, headers);
            fs.readFile('/Users/student/Ron/2015-11-chatterbox-server/client/client/images/spiffygif_46x46.gif', function (err, gif) {
                console.log('error', err);
                response.write(gif);
                response.end();
            });
        } else {
            console.log(request.url), 'url';
            var statusCode = 404;
            var headers = defaultCorsHeaders;
            headers['Content-Type'] = "text/plain";
            response.writeHead(statusCode, headers);
            response.end(JSON.stringify('not ok'));
        }
    }


    if (request.method === 'POST') {
        if (request.url.slice(0, 8) === '/classes') {
            console.log("Serving request type " + request.method + " for url " + request.url);
            var body = [];

            request.on('data', function (chunk) {
                body.push(chunk);
            });

            request.on('end', function () {
                body = Buffer.concat(body).toString();
                _storage.push(JSON.parse(body));
            });


            //response
            var statusCode = 201;
            var headers = defaultCorsHeaders;
            headers['Content-Type'] = "text/plain";
            response.writeHead(statusCode, headers);
            response.end(JSON.stringify('ok'));
        } else {
            var statusCode = 404;
            var headers = defaultCorsHeaders;
            headers['Content-Type'] = "text/plain";
            response.writeHead(statusCode, headers);
            response.end(JSON.stringify('not ok'));
        }
    }


    // The outgoing status.
    //var statusCode = 200;

    // See the note below about CORS headers.
    //var headers = defaultCorsHeaders;

    // Tell the client we are sending them plain text.
    //
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.
    //headers['Content-Type'] = "text/plain";

    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    //response.writeHead(statusCode, headers);

    // Make sure to always call response.end() - Node may not send
    // anything back to the client until you do. The string you pass to
    // response.end() will be the body of the response - i.e. what shows
    // up in the browser.
    //
    // Calling .end "flushes" the response's internal buffer, forcing
    // node to actually send all the data over to the client.
    //response.end("Hello, World!");
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 2 // Seconds.
};

