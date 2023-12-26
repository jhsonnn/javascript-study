// 제출 이벤트를 받는다(이벤트 핸들링)
// 제출된 입력 값들을 참조한다
// 입력 값에 문제가 있는 경우 이를 감지한다.
// 가입 환영 인사를 제공한다.

const form = document.getElementById("form")

//function ; 익명함수 
// => 이벤트 객체 event를 받아와서 입력 값을 받아들임
form.addEventListener("submit", function(event){
    // submit 이벤트 때문에 새로고침됨. 따라서 기존 기능 차단
    event.preventDefault()

    let userId = event.target.id.value
    // console.log(userId)
    let userPw1 = event.target.pw1.value
    let userPw2 = event.target.pw2.value
    let userName = event.target.name.value
    let userPhone = event.target.phone.value
    let userPosition  = event.target.position.value
    let userGender = event.target.gender.value
    let userEmail = event.target.email.value
    let userIntro = event.target.intro.value

    //아이디가 너무 짧으면 조건으로 제한
    if(userId.length < 6){
        alert("아이디가 너무 짧습니다. 6자 이상 입력해주세요.")
        //함수 강제 종료
        return
    }

    if(userPw1 !== userPw2){
        alert("비밀번호가 일치하지 않습니다.")
        return
    }

    //가입 잘 되었다! 환영!
    //innerHTML ; 앞의 객체의 HTML 코드를 부르는 속성
    //아래 코드는 아무 것도 없는 것을 HTML 코드로 대체한다
    document.body.innerHTML = ""
    //코드 추가 메서드 ; write()
    document.write(`<p>${userId}님 환영합니다</p>`)

    // console.log(userId, userPw1, userPw2, userName,
    //     userPhone, userPosition, userGender, userEmail, userIntro)
})