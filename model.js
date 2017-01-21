const xtend = require('xtend')

const STORAGE_ID = 'todos-choo'
const keysToSave = ['counter', 'items']

module.exports = {
  namespace: 'todos',
  state: {
    // UI state
    editing: null,
    name: '',
    filter: '',
    // real state
    counter: 0,
    items: []
  },
  reducers: {
    init: init,
    updateNew: updateNew,
    add: add,
    toggle: toggle,
    edit: edit,
    cancelEditing: cancelEditing,
    update: update,
    delete: deleteItem,
    clearCompleted: clearCompleted,
    toggleAll: toggleAll,
    filter: filter
  },
  subscriptions: {
    init: initModel
  },

  // This is not for the model. But I put this here to colocate it with other model functions.
  onStateChange: onStateChange
}

function getState () {
  const json = window.localStorage.getItem(STORAGE_ID)
  if (json) {
    return JSON.parse(json)
  } else {
    return null
  }
}

function saveState (state) {
  window.localStorage.setItem(STORAGE_ID, JSON.stringify(state))
}

function initModel (send, done) {
  try {
    const state = getState()
    if (state) {
      send('todos:init', { payload: state }, done)
    } else {
      done()
    }
  } catch (e) {
    done(e)
  }
}

function equalProps (keys, state, prev) {
  return keys.reduce(function (acc, key) {
    return acc && state[key] === prev[key]
  }, true)
}

function pick (keys, state) {
  return keys.reduce(function (acc, key) {
    acc[key] = state[key]
    return acc
  }, {})
}

// Reducers

function init (state, action) {
  return { counter: action.payload.counter, items: action.payload.items }
}

function updateNew (state, action) {
  return { name: action.payload }
}

function add (state, action) {
  return {
    counter: state.counter + 1,
    name: '',
    items: state.items.concat({ id: state.counter, name: state.name, done: false })
  }
}

function toggle (state, action) {
  return {
    items: state.items.map(function (todo) {
      if (todo.id === action.payload) {
        return xtend({}, todo, { done: !todo.done })
      } else {
        return todo
      }
    })
  }
}

function edit (state, action) {
  return { editing: action.payload }
}

function cancelEditing (state, action) {
  return { editing: null }
}

function update (state, action) {
  return {
    editing: null,
    items: state.items.map(function (todo) {
      if (todo.id === action.payload.id) {
        return xtend({}, todo, { name: action.payload.name })
      } else {
        return todo
      }
    })
  }
}

function deleteItem (state, action) {
  return {
    items: state.items.filter(function (todo) {
      return todo.id !== action.payload
    })
  }
}

function clearCompleted (state, action) {
  return {
    items: state.items.filter(function (todo) {
      return !todo.done
    })
  }
}

function toggleAll (state, action) {
  const allDone = state.items.every(function (todo) {
    return todo.done
  })
  return {
    items: state.items.map(function (todo) {
      return xtend({}, todo, { done: !allDone })
    })
  }
}

function filter (state, action) {
  return { filter: action.payload }
}

function onStateChange (state, data, prev, caller, createSend) {
  if (prev && prev.todos && !equalProps(keysToSave, state.todos, prev.todos)) {
    saveState(pick(keysToSave, state.todos))
  }
}
