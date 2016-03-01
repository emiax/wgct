var requestAnimationFrame = require('raf'); 
var readyMessage = JSON.stringify({msg: 'ready'});

// server responses

// READY TO RENDER:
// {
//   msg: 'ready'
//   state: object state
// }

function Wgct(serverUrl) {
  this._socket = null;
  this._onSyncSignal = () => {};
  this._serverUrl = serverUrl;
};


/**
 * fn(object state)
 */
Wgct.prototype.requestAnimationFrame = function (fn) {
  requestAnimationFrame(() => {
    this._onSyncSignal = fn;
    this._socket.send(readyMessage);
  });
};

Wgct.prototype.connect = function (fn) {
  var s = this._socket = new WebSocket(this._serverUrl);

  s.onopen = () => {
    fn();
    console.log("Connected!");
  };
  
  // get ready to parse incoming signals.
  s.onmessage = (evt) => {
    var data = JSON.parse(evt.data);
    // ready to render?
    if (data.msg === 'ready') {
      this._onSyncSignal(data.state);
      this._onSyncSignal = () => {};
    };
    // possibly handle other server signals here.
  };
}


module.exports = Wgct;
