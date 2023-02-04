// state 구조
// state:{
//     todos:{
//         text:"",
//         completed:true
//     },
//     currentFilter:"All"||"Active"||"Completed"
// }

const getTodoElement = (todo) => {
  const { text, completed } = todo;

  return `
    <li ${completed ? 'class="completed"' : ""}>
      <div class="view">
        <input 
          ${completed ? "checked" : ""}
          class="toggle" 
          type="checkbox">
        <label>${text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${text}">
    </li>`;
};

// 완료되지 않은 todo 항목 갯수 확인
const getTodoCount = (todos) => {
  // completed가 false인 것만 filter로 
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) {
    return "1 Item left";
  }

  return `${length} Items left`;
};

// 타겟이 되는 돔 요소 : targetElement
export default (targetElement, state) => {
  const { currentFilter, todos } = state;

  // targetElement cloneNode()를 이용해 원본 노드를 복사하고 
  // Node.cloneNode(deep)는 deep : true면 node의 children까지 복제 false면 node만 복제
  const element = targetElement.cloneNode(true);

  const list = element.querySelector(".todo-list"); // todo 리스트 ul
  const counter = element.querySelector(".todo-count"); // 완료되지 않은 todo 수를 가진 span
  const filters = element.querySelector(".filters"); // 필터 유형을 가진 링크들 ul

  // getTodoElement를 이용해 state에서 가져온 todos의 todo들을 text-HTML로 만들어서 join으로 결합한 것을 innerHTML을 통해 생성
  list.innerHTML = todos.map(getTodoElement).join("");
  counter.textContent = getTodoCount(todos);

  // <a href="#/">All</a>
  // <a href="#/active">Active</a>
  // <a href="#/completed">Completed</a> 
  // filters.querySelectorAll("li a")를 통해서 위 3가지 a태그들을 NodeList로서 얻고 
  // forEach로 currentFilter와 text값이 같은것에 selected 클래스를 추가한다.
  Array.from(filters.querySelectorAll("li a")).forEach((a) => {
    // Node.textContent는 node의 child의 텍스트 컨텐츠를 보여준다.
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });

  return element;
};
