const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42"
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all"
const request1 = new XMLHttpRequest()
const request2 = new XMLHttpRequest()

const header = document.getElementById("header")
const main = document.getElementById("main")
const input = document.getElementById("filter-text")
const button = document.getElementById("filter-button")
const select = document.getElementById("filter-select")
const more = document.getElementById("more")
const tothetop = document.getElementById("tothetop")

const currentDogs = []


function displayDogs(item){
    //강아지 표시하고 화면에 추가
    const dogImgDiv = document.createElement("div")
    dogImgDiv.classList.add("flex-item")

    //dogImgDiv에 실제 이미지 넣기
    dogImgDiv.innerHTML = `
        <img src=${item}>
    `

    //main 영역에 추가
    main.appendChild(dogImgDiv)
}
//페이지가 처음 펼쳐졌을 때 하는 동작
window.addEventListener("load", function(){

    // 강아지 사진 뿌리기

    //1.요청하기
    request1.open("get", apiRandomDogs)
    //3.응답 받으면 뭐할지
    //응답이 load 됐을 때
    request1.addEventListener("load", function(){
        //객체의 응답을 parsing 해서 저장(response; message와 status를 포함한 객체 총 42개)
        const response =  JSON.parse(request1.response)
        //console.log(response.message)
        //response는 현재 42개의 객체를 담은 배열이므로 forEach()
        response.message.forEach(function(item){
            currentDogs.push(item)
            displayDogs(item)
            
        });
    })
    //2.요청 보내기
    request1.send()


    // select에 견종 정보 뿌리기

    request2.open("get", apiAllBreeds)
    request2.addEventListener("load", function(){
        const response = JSON.parse(request2.response)
        //우리가 뿌릴 건 response의 message에 있는 견종 정보
        //문제는 견종 정보가 key로 되어있는 상태
        //각 키에 세부 견종 정보로 mapping되어 있음
        //우리가 얻고 싶은 견종 정보가 key로 되어 있음->객체 리터럴에서는 value가 실제 값임
        //key는 데이터의 이름임
        //key만 얻어오자.
        // Object.keys() ; 객체의 key값만 모아서 데이터 반환
        //console.log(Object.keys(response.message))
        //견종정보만 모아서 select에 뿌려주자
        Object.keys(response.message).forEach(function(item){
            const option = document.createElement("option")
            option.textContent = item
            option.value = item
            select.appendChild(option)
        });
        //console.log(response)
    
    })

    request2.send()
})


// 필터링하기

button.addEventListener("click", function(){
    main.innerHTML = ""
    //input에 쓰여있는 걸 기반으로 필터링하고 filterDogs라는 변수에 필터링 결과 저장
    let filterDogs = currentDogs.filter(function(item){
        //indexOf() ; 포함하면 1, 포함하지 않으면 -1 반환
        //문자열로 된 견종 정보 안에 input에 쓴 내용이 있으면 필터링하기
        // -1;포함되지 않은 경우를 제외하고 return
        return item.indexOf(input.value) !== -1
    })

    input.value = ""

    filterDogs.forEach(function(item){
        displayDogs(item)
     })
})

select.addEventListener("change", function(){
    main.innerHTML = ""
    let filterDogs = currentDogs.filter(function(item){
        return item.indexOf(select.value) !== -1
    })

    filterDogs.forEach(function(item){
       displayDogs(item)
    })
})

//more 버튼
more.addEventListener("click", function(){
    //강아지 사진을 한 번 더 가지고 와서 원래 있던 currentDogs 에 더 붙여줌
    //처음에 동작하고 쉬고 있는 request1 호출
    request1.open("get", apiRandomDogs) //한 번 더 가져오면 총 84개
    //load 됐을 때의 이벤트 추가
    request1.addEventListener("load", function(){
        const response = JSON.parse(request1.response)
        response.message.forEach(function(item){
            currentDogs.push(item)
            displayDogs(item)
        })
    })
    
    request1.send()
})

tothetop.addEventListener("click", function(){
    //스크롤 기능 : 웹 브라우저가 가지고 있음
    //scrollTo() ; 주어진 위치로 이동한다
    //위치(y축)에 대한 값을 객체 리터럴으로 전달
    window.scrollTo({ top: 0 })
})