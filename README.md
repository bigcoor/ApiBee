ApiBee
======

Make Express routes grouped by some keys.


## Basic Usage
Express route file `routes.js`
```javascript
'use strict';

var bee        = require('apibee');

module.exports = function(router) {
  var api = new bee(router)

  api.group('Index', function(api) {
    api.get('/', function(req, res) {
      //do stuff
    });
    api.post('/', function(req, res) {
      //do stuff  
   })

  api.group('User', function(api) {
    api.get('/', function(req, res) {
      //do stuff
    });
    api.post('/', function(req, res) {
      //do stuff  
   })
  }
};
