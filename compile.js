var fs = require('fs'),
    marked = require('marked'),
    moment = require('moment'),
    cheerio = require('cheerio');

// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

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
<!DOCTYPE html><html><head>\
<meta charset="utf-8">\
<meta http-equiv="X-UA-Compatible" content="IE=edge">\
<meta name="viewport" content="width=device-width, initial-scale=1">\
<title>'+name+'\'s Blog</title>\
<link rel="stylesheet" href="/blog/style.min.css"/></head>\
<body><a href="..">'+name+'</a>\'s Blog<nav class="right"><a href="/blog">Home</a><a href="/blog/archive">Archive</a></nav><hr/>';
    var footer = '<hr/><nav><a href="/blog">Home</a> <a href="/blog/archive">Archive</a></nav></body></html>';
    // Archive
    var $ = cheerio.load(posts.join(''));
    var archive = '<h2>Archive</h2>';
    var d = 0;
    $('h1').each(function(i, elem) {
      var title = $(elem);
      var date = moment(files[d++]);
      while(d<files.length && date.isAfter()) {
        date = moment(files[d++]);
      }
      var titleHash = title.text().toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').slice(0, 3).join('-');
      var url = 'pages/'+date.format('YYYY-MM-DD')+'-'+titleHash+'.html';
      fs.writeFile('www/' + url, header + posts[i] + footer);
      archive += '<code>'+date.format('DD MMM YYYY')+'</code> &mdash; <a href="'+url+'">'+title.text()+'</a><br/>';
    });
    // Write files
    Promise.all([
      new Promise(function(resolve, reject) {
        fs.writeFile('www/index.html', header + posts.slice(0, 3).join('<hr/>') + footer, resolve);
        console.log(' - index generated');
      }),
      new Promise(function(resolve, reject) {
        fs.writeFile('www/archive.html', header + archive + footer, resolve);
        console.log(' - archive generated ('+$('h1').length+')');
      })
    ]).then(function() {
      console.log(' - done!');
    });
  });
});
