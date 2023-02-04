// Todo-list fake로 만드는 부분 10개 데이터를 만듬
import getTodos from './getTodos.js';
// render 하는 부분
import view from './view.js';

const state = {
  todos: getTodos(),
  currentFilter: 'All'
};

const main = document.querySelector('.todoapp');

// window.requestAnimationFrame(callback)
// 브라우저에게 수행하기를 원하는 애니메이션을 알리고 
// 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 합니다. 
// 이 메소드는 리페인트 이전에 실행할 콜백을 인자로 받습니다.
window.requestAnimationFrame(() => {
  // view(노드, 스테이트);
  const newMain = view(main, state)
  // Element.replaceWith(new Element) 
  // replaceWith는 Element의 기존 DOM요소를 제거하고 new Element로 바꾼다.
  // 여기서 Element는 Node 또는 String 객체이다.
  // new Element는 String 객체를 Text-Node로서 삽입되게된다.
  main.replaceWith(newMain)
})