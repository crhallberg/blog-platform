It's powered by [node](http://nodejs.org) and [Markdown](https://daringfireball.net/projects/markdown/ "GitHub flavored"). It's got a sexy font: [Source Sans Pro](http://github.com/adobe-fonts/source-sans-pro). And it has William Taft as its mascot.

But most importantly, it's light. As light they come (while still looking this nice). Experience the throll of your whole blog loading faster than your iPhone progress bar can fill!

## How To

1. `npm install`
2. Write blog posts as Markdown files.
3. Name those files by their release date and put them in posts/.
  * posts/2016-01-06.md
  * posts/2016-01-12.md
  * posts/2017-01-01.md (future posts will be skipped)
4. `node compile.js`
5. Upload index.html and archive.html to your server along side the files in www/.

### Credits

The design of this platform was heavily inspired by [Maciej Ceglowski](https://twitter.com/baconmeteor)'s incredible [talk]() (53 minutes; [blog post](http://idlewords.com/talks/website_obesity.htm), if you prefer reading) and the platform [John Pavlick](https://twitter.com/angrysql) built in response: [hypertextual](http://hypertextual.herokuapp.com/).
