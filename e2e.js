var test = require('tape')
var webdriverio = require('webdriverio')
var options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
}
var client = webdriverio.remote(options)

var URL = 'http://localhost:8080/'

client.init().url(URL).then(function () {
  test('initial', function (t) {
    t.plan(2)
    client
      .getText('h1')
      .then(function (text) {
        t.equal(text, 'todos')
      })
      .getText('.todo-count')
      .then(function (text) {
        t.equal(text, '0 items left')
      })
      .catch(fail(t))
  })

  test('add todo', function (t) {
    t.plan(2)
    client
      .setValue('.new-todo', 'Buy apples\nWrite a blog post\nSleep well\n')
      .getText('.todo-list li')
      .then(function (texts) {
        t.deepEqual(texts, ['Buy apples', 'Write a blog post', 'Sleep well'])
      })
      .getText('.todo-count')
      .then(function (text) {
        t.equal(text, '3 items left')
      })
      .catch(fail(t))
  })

  test('mark done', function (t) {
    t.plan(3)
    client
      .click('.todo-list li:nth-child(2) .toggle')
      .getAttribute('.todo-list li:nth-child(2) .toggle', 'checked')
      .then(function (checked) {
        t.equal(checked, 'true')
      })
      .getText('.todo-count')
      .then(function (text) {
        t.equal(text, '2 items left')
      })
      .getCssProperty('.todo-list li:nth-child(2) label', 'text-decoration')
      .then(function (decoration) {
        t.equal(decoration.value, 'line-through')
      })
      .catch(fail(t))
  })

  test('apply filters', function (t) {
    t.plan(3)
    client
      .click('.filters li:nth-child(2)')
      .getText('.todo-list li')
      .then(function (texts) {
        t.deepEqual(texts, ['Buy apples', 'Sleep well'])
      })

      .click('.filters li:nth-child(3)')
      .getText('.todo-list li')
      .then(function (text) {
        t.equal(text, 'Write a blog post')
      })

      .click('.filters li:nth-child(1)')
      .getText('.todo-list li')
      .then(function (texts) {
        t.deepEqual(texts, ['Buy apples', 'Write a blog post', 'Sleep well'])
      })
      .catch(fail(t))
  })

  test('clear completed', function (t) {
    t.plan(1)
    client
      .click('.clear-completed')
      .getText('.todo-list li')
      .then(function (texts) {
        t.deepEqual(texts, ['Buy apples', 'Sleep well'])
      })
      .catch(fail(t))
  })

  test('toggle-all', function (t) {
    t.plan(1)
    client
      .click('.toggle-all')
      .getText('.todo-count')
      .then(function (text) {
        t.equal(text, '0 items left')
      })
      .catch(fail(t))
  })

  // TODO: Hover doesn't work somehow...
  test.skip('destroy', function (t) {
    t.plan(1)
    client
      .moveToObject('.todo-list li:nth-child(1) .destroy')
      .click('.todo-list li:nth-child(1) .destroy')
      .getText('.todo-list li')
      .then(function (text) {
        t.equal(text, 'Sleep well')
      })
      .catch(fail(t))
  })

  test.onFinish(function () {
    client.end()
  })
})

function fail (t) {
  return function (e) {
    t.fail(e.message)
  }
}
