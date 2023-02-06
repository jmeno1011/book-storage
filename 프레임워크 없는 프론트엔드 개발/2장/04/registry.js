const registry = {}

// 컴포넌트를 만들어주는 함수 component에 targetElement(타겟노드), state(데이터)를 넣어준다.
const renderWrapper = component => {
  return (targetElement, state) => {
    // 해설 필요
    const element = component(targetElement, state)

    const childComponents = element
      .querySelectorAll('[data-component]')

    Array
      .from(childComponents)
      .forEach(target => {
        const name = target
          .dataset
          .component

        const child = registry[name]
        if (!child) {
          return
        }

        target.replaceWith(child(target, state))
      })

    return element
  }
}

// 예시 파라메터: ('todos', todosView)
// todos는 html코드에 data-component의 값이 todos라고 되어 있는 컴포넌트를 찾는 부분이다.
// todosView는 todos에 해당하는 컴포넌트를 만들어주는 함수이다.
const add = (name, component) => {
  registry[name] = renderWrapper(component)
}

const renderRoot = (root, state) => {
  const cloneComponent = root => {
    return root.cloneNode(true)
  }

  return renderWrapper(cloneComponent)(root, state)
}

export default {
  add,
  renderRoot
}
