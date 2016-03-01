var server = require('http').createServer()
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = 8080;

app.use(express.static(__dirname + '/'));

var nReady = 0;
var state = 0;

// todo: handle new conections and disconnections in a (much) more robust way!
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    // any message from a client is a ready message
    nReady++;
    console.log('ready message ' + nReady + " out of " + wss.clients.length);    
    if (nReady === wss.clients.length) {
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({msg: 'ready', state: state}));
      });
      nReady = 0;
      state = Math.round(Math.random() * 0xffffff);
    }
  });
  ws.send(JSON.stringify({msg: 'connected'}));
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });
