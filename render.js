var hyperstream = require('hyperstream')
var createHtml = require('create-html')
var stream = require('stream')
var app = require('.')

var base = {
  title: 'choo • TodoMVC',
  script: 'bundle.js',
  css: 'bundle.css',
  head: '<meta name="viewport" content="width=device-width, initial-scale=1">'
}
var hs = hyperstream({
  body: {
    _prependHtml: app.toString('/')
  }
})

var pass = new stream.PassThrough()
pass.end(createHtml(base))

pass.pipe(hs).pipe(process.stdout)
