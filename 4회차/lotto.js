
const todaySpan = document.querySelector("#today")
const numbersDiv = document.querySelector(".numbers")
const drawButton = document.querySelector("#draw")
const resetButton = document.querySelector("#reset")

//추첨 버튼을 눌렀을 때 lottoNumbers에 번호 6개를 채운다
let lottoNumbers = []


//날짜 표시
const today = new Date()
let year = today.getFullYear()
let month = today.getMonth() + 1
let day = today.getDate()
todaySpan.textContent = `${year}년 ${month}월 ${day}일 `

function paintNumber(number){
    const eachNumDiv = document.createElement("div")
    eachNumDiv.classList.add("eachnum")
    eachNumDiv.textContent = number
    numbersDiv.append(eachNumDiv)
}

drawButton.addEventListener("click", function(){

    while(lottoNumbers.length < 6){
        //6개 번호가 될 때까지 채우기
        let rn = Math.floor(Math.random() * 45) + 1

        //indexOf를 사용해서 lottoNumbers에 해당 숫자가 있으면
        //1 반환, 없으면 -1 반환하게 됨
        if(lottoNumbers.indexOf(rn) === -1){
            //해당 숫자가 없으면 push
            lottoNumbers.push(rn)

            //추첨될 때마다 추첨된 내용을 화면에 표시
            //push된 rn을 paintNumber를 통해 그림
            paintNumber(rn)

        }

    }
    // console.log(lottoNumbers)
})


//reset 버튼을 클릭했을 때
resetButton.addEventListener("click", function(){
    //splice ; splice(시작 인덱스 위치, 거기서부터 몇개 지울지)
    lottoNumbers.splice(0, 6)
    //다시 버튼 눌렀을 때 화면에 출력된 번호 지우기
    numbersDiv.innerHTML=""
})


