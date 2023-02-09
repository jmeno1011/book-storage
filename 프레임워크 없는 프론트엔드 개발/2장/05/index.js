import getTodos from './getTodos.js'
import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'

registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp')
    const newMain = registry.renderRoot(main, state)
    // main.replaceWith(newMain)
    // main 을 newMain으로 변경 했던 부분을 
    // applyDiff(현재 DOM노드, 실제 DOM 노드, 새로운 가상 DOM 노드의 부모)
    applyDiff(document.body, main, newMain)
  })
}

window.setInterval(() => {
  state.todos = getTodos()
  render()
}, 1000)

render()
