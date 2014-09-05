var Doc              = require('./doc')
  , _                = require('underscore')
  , parameterChecker = require('./parameter_checker')
  , apiResponse      = require('./api_response')

module.exports = function(app, version, configPath) {
  var config = configPath 
             ? require(configPath) 
             : false

    , bee    = {}
    , path   = null

  bee.version = version;
  bee.doc = new Doc();

  bee.printJSONResultMiddleware = function(req, res, next) {
    var oldJson = res.json

    res.json = function() {
      var code, data;

      if (arguments.length === 2) {
        code = arguments[0];
        data = arguments[1];
      } else {
        code = 200;
        data = arguments[0];
      }

      console.log('res.json')
      console.log(' > ' + code);
      console.log(data);

      oldJson.apply(res, [ code, data ]);
    };

    next();
  };

  bee.printRequestParamsMiddleware = function(req, res, next) {
   
    if (req.user) { 
      console.log(req.method + ' ' + req.url);
      console.log(' * user   : ' + req.user.id);
      console.log(' * token  : ' + req.header('token'));
    }

    if (req.params) {
      console.log(' * params : ');
      console.log(req.params);
    }

    if (req.body) {
      console.log(' * body   : ');
      console.log(req.body);
    }

    next();
  };

  _.each([ 'get', 'post', 'put', 'delete' ], function(verb) {
    bee[verb] = function() {
      var route      = arguments[0]
        , options    = {}
        , handler
        , middleware = []

      if (arguments.length === 2) {
        handler = arguments[1];
      } else if (arguments.length === 3) {
        options = arguments[1];
        handler = arguments[2];
      }

      if (config && config.get('VERBOSE')) {
        middleware.push(bee.printJsonResultMiddleware);
      }

      middleware.push(apiResponse.responseMiddleware);

      if (options.requireParameters) {
        middleware.push(new parameterChecker(options.requireParameters));
      }

      middleware.push(bee.logUserAction);

      if (config && config.get('VERBOSE')) {
        middleware.push(bee.printRequestParamsMiddleware);
      }

      path = bee.version
           ? ('/' + bee.version + route)
           : route;

      app[verb](path, middleware, handler);

      bee.doc.endpoint(verb.toUpperCase(), bee.version + route, options);
    };
  });

  bee.group = function() {
    var name = arguments[0]
      , options
      , block
      , groupDoc = new Doc()
      , oldDoc   = bee.doc

    if (arguments.length === 2) {
      block = arguments[1];
    } else if (arguments.length === 3) {
      options = arguments[1];
      block = arguments[2];
    }

    bee.doc = groupDoc;
    block(bee);

    bee.doc = oldDoc;

    bee.doc.section(name, groupDoc);
  };

  return bee;
};