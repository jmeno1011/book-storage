// 두 노드간 차이 확인
const isNodeChanged = (node1, node2) => {
    const n1Attributes = node1.attributes
    const n2Attributes = node2.attributes
    // 1. 각각의 노드의 속성의 수를 비교
    if (n1Attributes.length !== n2Attributes.length) {
      return true
    }
  
    
    // from으로 Attribute의 속성들이 들어있는 배열을 작성하고
    // 배열을 find함수를 이용해 변환 요소가 있으면 변환된 첫번째 요소를 반환하고
    // 변경된 Attribute가 없다면 undefined를 반환한다.
    const differentAttribute = Array
      .from(n1Attributes)
      .find(attribute => {
        const { name } = attribute
        const attribute1 = node1
          .getAttribute(name)
        const attribute2 = node2
          .getAttribute(name)
  
        return attribute1 !== attribute2
      })
  
      // 변경이 있다면 true를 반환하여 실제 노드를 가상노드로 변경한다.
    if (differentAttribute) {
      return true
    }
  
    // children의 갯수가 같지만 내부 textContent가 다를경우 
    // true를 반환하여 실제노드를 가상노드로 변경한다.
    // ex: <div>test</div> <div>ttttt</div> 와 같이 맨마지막 노드를 비교할때 
    // 노드 내부의 텍스트가 다를경우도 비교해줘야한다.
    if (node1.children.length === 0 &&
      node2.children.length === 0 &&
      node1.textContent !== node2.textContent) {
      return true
    }
  
    return false
  }
  
  const applyDiff = (
    parentNode,
    realNode,
    virtualNode) => {
      // 새로운 노드가 없을 경우(!virtualNode)
      // 실제 노드를 삭제한다. -> realNode.remove();
    if (realNode && !virtualNode) {
      realNode.remove()
      return
    }
  
    // 실제노드가 정의되지 않았지만 가상노드가 존재하는경우 부모노드에 추가
    // -> 데이터의 유무에 의한 노드 생성시 다룸
    if (!realNode && virtualNode) {
      parentNode.appendChild(virtualNode)
      return
    }
  
    // 두 노드가 정의되어 있고 두 노드간에 차이가 있는지 확인
    if (isNodeChanged(virtualNode, realNode)) {
      realNode.replaceWith(virtualNode)
      return
    }
  
    // 모든 하위 노드에 대해서도 동일한 diff 알고리즘을 적용한다.
    // 1. Array.from으로 하위 노드를 배열로 뽑아내고 
    const realChildren = Array.from(realNode.children)
    const virtualChildren = Array.from(virtualNode.children)
  
    // 2. 비교시 하위 노드들의 갯수가 제일 큰것에 길이를 가져온후
    const max = Math.max(
      realChildren.length,
      virtualChildren.length
    )
    // 3. 하위노드들의 갯수만큼 for문을 으로 applyDiff를 적용한다(재귀적이여서 하위노드가 없을때까지 반복됨 )
    for (let i = 0; i < max; i++) {
      // diff 알고리즘 적용 부분
      applyDiff(
        realNode,
        realChildren[i],
        virtualChildren[i]
      )
    }
  }
  
  export default applyDiff
