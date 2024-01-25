// 요소 선택 및 배열 선언
const todoList = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')
let todoArr = [];


//할 일 저장하기
//로컬 저장소에 저장하기
function saveTodos(){
    //todoArr내용(객체포함)을 문자열로 바꾸어서 todoString에 저장
    const todoString = JSON.stringify(todoArr)
    localStorage.setItem("myTodos", todoString)
}
//로컬 저장소에서 가져오기
//페이지를 열었을 때 한번만 가져오면 됨
function loadTodos(){
    const myTodos = localStorage.getItem("myTodos")
    //myTodos가 있을 때만 parsing 과 display 함
    if(myTodos !== null){
        JSON.parse(myTodos)
        //todoArr에 갱신
        todoArr = JSON.parse(myTodos)
        displayTodos()
    }
}
//상황과 관계없이 페이지 열릴 때마다 한 번 호출하면 됨
loadTodos()


//할 일 삭제하기
//삭제버튼 클릭하면 지우기
function handleTodoDelBtnClick(clickedId){
    //클릭된 애만 제외하고 나머지만 남김
    todoArr = todoArr.filter(function(aTodo){
        //클릭된 것의 id와 aTodo의 id가 다르면 제외하고 나머지 남김
        return aTodo.todoId !== clickedId
    })
    displayTodos()
    saveTodos()

}


//할 일 수정하기
//할 일을 클릭하면 그 할 일의 id를 받아서 해당하는 할 일의 클래스만 수정
function handleTodoItemClick(clickedId){
    //클릭한 item만 todoDone의 상태를 바꿈
    todoArr = todoArr.map(function(aTodo){
        if(aTodo.todoId === clickedId){
            return{
                ...aTodo,
                todoDone: !aTodo.todoDone
            }
        }else{
            //일치하지 않는 경우는 원래 상태 그대로 반환
            return aTodo
        }
    })
    //누를 때마다 상태가 바뀜-> 이때마다 수행함
    displayTodos()
    saveTodos()

    //console.log(todoArr)
}


// 할 일 추가하기, 할 일 보여주기, 할 일 수정하기, 할 일 삭제하기
//할 일 보여주기
function displayTodos(){
    //forEach()가 모든 배열의 요소들을 한번씩 방문해서 출력하기 때문에
    //li에 계속 쌓이는 형태로 출력
    //따라서 원래 써져있는 내용을 지우기
    todoList.innerHTML=""
    //배열의 요소 수가 내가 보여줄 할 일의 수
    todoArr.forEach(function(aTodo){
        //요소들은 li에 들어감. li를 만들어서 추가
        const todoItem = document.createElement("li")
        //li 만들어질 때마다 거기에 삭제 버튼 만들기
        const todoDelBtn = document.createElement("span")
        //li태그 안에 span태그 만들기
        todoDelBtn.textContent = "x"
        todoItem.textContent = aTodo.todoText
        todoItem.title = "클릭하면 완료됨"
        //선택하면 배경색 달라짐. class에 따라 처리
        if(aTodo.todoDone){
            todoItem.classList.add("done")
        }else{
            todoItem.classList.add("yet")
        }

        todoDelBtn.title = "클릭하면 삭제됨"

        //todoItem을 클릭했을 때의 이벤트 핸들러
        todoItem.addEventListener("click", function(){
            handleTodoItemClick(aTodo.todoId)
        })

        //할 일 삭제하기 이벤트 핸들러
        todoDelBtn.addEventListener("click", function(){
            handleTodoDelBtnClick(aTodo.todoId)
        })
        //todoItem에 todoDelBtn 추가
        todoItem.appendChild(todoDelBtn)
        todoList.appendChild(todoItem)
    })
}

//할 일 추가하기
todoForm.addEventListener("submit", function(e){
    // 이벤트 ; 제출할 때마다 페이지 새로고침
    // 새로고침 막기
    e.preventDefault()
    //할 일은 js에서 기본적으로 제공하지 않음. 따라서 객체 생성
    //객체 리터럴 이용
    const toBeAdded = {
        todoText: todoForm.todo.value,
        todoId: new Date().getTime(),
        todoDone: false
    }
    //추가하고 나서 input 내용 지우기
    todoForm.todo.value=""

    todoArr.push(toBeAdded)
    displayTodos()
    //할 일 추가할 때 로컬 저장소에 저장
    saveTodos()
    //console.log(todoArr)
})