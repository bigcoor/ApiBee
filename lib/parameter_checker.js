var _  = require('underscore')

module.exports = function ParameterChecker(requiredParameters) {
  return function(req, res, next) {
    var requiredParameterKeys, passedParams, unpassedParams

    requiredParameterKeys = (requiredParameters instanceof Array)
                            ? requiredParameters
                            : _.keys(requiredParameters);

    passedParams          = _.union(_.keys(req.params), _.keys(req.query), _.keys(req.body));
    unpassedParams        = _.difference(requiredParameterKeys, passedParams);

    if (unpassedParams.length > 0) {
      res.json(400, { error: 'missing parameters ' + unpassedParams });
    } else {
      next();
    }
  }
};