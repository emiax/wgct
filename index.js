var Wgct = require('./wgct');
var Stats = require('stats-js'); 
var wgct = new Wgct('ws://localhost:8080');

// Setup stats-js
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );

// Start the 'render loop'
function loop(state) {
  stats.begin();
  stats.end();
  wgct.requestAnimationFrame(loop);
  
  var color = "#" + state.toString(16);
  document.body.style.backgroundColor = color;
}

wgct.connect(() => {
  wgct.requestAnimationFrame(loop);
});

