## ApiBee

Make Express routes grouped by some keys.


## Basic Usage
cd into `your project` && `npm install apibee --save-dev`

Example for `routes.js`
```javascript
'use strict';

var bee = require('apibee');

module.exports = function(router) {
  var api = new bee(router)

  api.group('Index', function(api) {
    api.get('/read', function(req, res) {
      //do stuff
    });
    api.post('/update', function(req, res) {
      //do stuff  
    })
  }

  api.group('User CRUD', function(api) {
    api.get('/read', function(req, res) {
      //do stuff
    });
    api.post('/update', function(req, res) {
      //do stuff  
    })
  }
};
```

## License
[GPL](http://www.gnu.org/licenses/gpl-2.0.html)
