var choo = require('choo')
var mount = require('choo/mount')
var persist = require('choo-persist')
var css = require('sheetify')
var mainView = require('./views/main')
var model = require('./model')

css('todomvc-common/base.css')
css('todomvc-app-css/index.css')

var app = choo()
app.model(model)

app.router([
  ['/', mainView],
])

if (module.parent) {
  module.exports = app
} else {
  if (!document.getElementById('root')) {
    var root = document.createElement('div')
    root.setAttribute('id', 'root')
    document.body.appendChild(root)
  }
  persist({ name: 'todomvc-choo' }, function (plugin) {
    app.use(plugin)
    mount('#root', app.start())
  })
}
