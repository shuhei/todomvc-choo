const choo = require('choo')
const mainView = require('./views/main')
const model = require('./model')

const app = choo()
app.model(model)

app.router((route) => [
  route('/', mainView)
])

app.use({
  onStateChange: model.onStateChange
})

const tree = app.start()
document.body.appendChild(tree)
