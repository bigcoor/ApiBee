module.exports.responseMiddleware = function responseMiddleware(req, res, next) {
  res.apiSuccess = function(result) {
    res.json({ error: null, result: result });
  }

  res.apiError = function(exception) {
    res.json({ error: exception, result: null });
  }

  next();
};