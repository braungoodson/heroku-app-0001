var fs = require('fs');
var cache = {
  files: {
    index: null
  }
};
fs.readFile('./app/index.html',function(e,d){
  if (e) {
    console.log('Could not cache index.');
  } else {
    cache.files.index = d;
    console.log('Index cached!');
  }
});
var luigi = require('luigi-mario');
luigi.plumbing({
  port: process.env.PORT || 10000,
  http: {
    get: {
      '/': function (q,r) {
        return r.setHeader('Content-Type','text/html') + r.send(cache.files.index);
      }
    }
  }
});
