var choo = require('choo')
var css = require('sheetify')
var mainView = require('./views/main')
var model = require('./model')

css('todomvc-common/base.css')
css('todomvc-app-css/index.css')

var app = choo()
app.model(model)

var onWebsite = typeof window === 'object' && window.location.host.indexOf('localhost') !== 0
var prefix = onWebsite ? '/todomvc-choo' : ''
app.router([
  [prefix + '/', mainView]
])

app.use({
  onStateChange: model.onStateChange
})

if (module.parent) {
  module.exports = app
} else {
  if (!document.getElementById('root')) {
    var root = document.createElement('div')
    root.setAttribute('id', 'root')
    document.body.appendChild(root)
  }
  var mount = require('choo/mount')
  mount('#root', app.start())
}
