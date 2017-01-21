var html = require('choo/html')
var headerView = require('./header')
var todoListView = require('./todo-list')
var footerView = require('./footer')

module.exports = function mainView (state, prev, send) {
  var todos = state.todos
  return html`
    <div id="root">
      <section class="todoapp">
        ${headerView(todos, prev, send)}
        ${todoListView(todos, prev, send)}
        ${footerView(todos, prev, send)}
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>choo by <a href="https://yoshuawuyts.com/">Yoshua Wuyts</a></p>
        <p>Created by <a href="http://shuheikagawa.com">Shuhei Kagawa</a></p>
      </footer>
    </div>
  `
}
