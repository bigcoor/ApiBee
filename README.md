## ApiBee

Make Express routes grouped by some keys.


## Basic Usage
cd `your project` && npm install apibee --save-dev

Example for `routes.js`
```javascript
'use strict';

var bee = require('apibee');

module.exports = function(router) {
  var api = new bee(router)

  api.group('Index', function(api) {
    api.get('/', function(req, res) {
      //do stuff
    });
    api.post('/', function(req, res) {
      //do stuff  
   })

  api.group('User CRUD', function(api) {
    api.get('/', function(req, res) {
      //do stuff
    });
    api.post('/', function(req, res) {
      //do stuff  
   })
  }
};
