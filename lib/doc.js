module.exports = function() {
  this.data = [];

  this.section = function(name, children) {
    this.data.push({ 
        type     : 'section'
      , name     : name
      , children : children });
  };

  this.endpoint = function(method, path, options) {
    this.data.push({
        type    : 'endpoint'
      , method  : method
      , path    : path
      , options : options || {}
    });
  }
};
