const registry = {}

// 컴포넌트를 만들어주는 함수 component에 targetElement(타겟노드), state(데이터)를 넣어준다.
const renderWrapper = component => {
  return (targetElement, state) => {
    // 해설 필요
    const element = component(targetElement, state)

    // data-component 속성을 가진 모든 DOM 요소를 찾는다
    const childComponents = element
      .querySelectorAll('[data-component]')

    // 자식 구성 요소를 호출
    Array
      .from(childComponents)
      .forEach(target => {
        const name = target
          .dataset
          .component
        // data-component속성의 값을 키값으로 구성요소를 호출
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
// 따라서 registry의 키는 data-component 속성 값과 일치한다.
const add = (name, component) => {
  registry[name] = renderWrapper(component)
}

// root : root-element
// state : data
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
