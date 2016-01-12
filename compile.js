var fs = require('fs'),
    marked = require('marked'),
    moment = require('moment'),
    cheerio = require('cheerio');

fs.readdir('./posts', function(err, files) {
  var promises = [];
  // Sort into date order
  files.sort(function (a, b) {
    return moment(a).isBefore(b) ? 1 : -1;
  });
  // Parse async
  for (var i=0; i<files.length; i++) {
    if (moment(files[i]).isAfter()) continue;
    var p = new Promise(function(resolve, reject) {
      fs.readFile('./posts/'+files[i], 'ascii', function (err, md) {
        if (err) throw err;
        resolve(marked(md));
      });
    });
    promises.push(p);
  }
  // Print into files
  Promise.all(promises).then(function (posts) {
    console.log(' - compiled');
    var name = 'Chris Hallberg';
    var header = '\
<html><head>\
<meta charset="utf-8">\
<meta http-equiv="X-UA-Compatible" content="IE=edge">\
<meta name="viewport" content="width=device-width, initial-scale=1">\
<title>'+name+'\'s Blog</title>\
<link rel="stylesheet" href="./style.css"/>\
<script src="./highlight.js"></script></head><body>\
<a href="..">'+name+'</a>\'s Blog<nav><a href="/blog">Home</a><a href="/blog/archive">Archive</a></nav><hr/>';
    var footer = '<script>highlight("pre")</script></body></html>';
    var body = posts.join('<hr/>');
    // Archive
    var $ = cheerio.load(body);
    var archive = '<h1>Archive</h1>';
    $('h1').each(function(i, elem) {
      var title = $(elem);
      archive += '<code>'+moment(files[i]).format('DD MMM YYYY')+'</code> &mdash; <a href="index.html#'+title.attr('id')+'">'+title.text()+'</a><br/>';
    });
    // Write files
    Promise.all([
      new Promise(function(resolve, reject) {
        fs.writeFile('index.html', header + body + footer, resolve);
        console.log(' - index generated');
      }),
      new Promise(function(resolve, reject) {
        fs.writeFile('archive.html', header + archive + footer, resolve);
        console.log(' - archive generated ('+$('h1').length+')');
      })
    ]);
  });
});
