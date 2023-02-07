import getTodos from './getTodos.js'
import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'

import registry from './registry.js'

registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const render = () => {
  // 리렌더시 리페인트에 끝나는 시점에 콜백 함수 실행
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp')
    const newMain = registry.renderRoot(main, state)
    main.replaceWith(newMain)
  })
}

// 5초마다 임의의 데이터를 렌더링
window.setInterval(() => {
  state.todos = getTodos()
  render()
}, 5000)

render()
