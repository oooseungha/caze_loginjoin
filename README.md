# 자사 쇼핑몰 로그인/회원가입 시스템 구현 프로젝트
HTML, CSS, JavaScript, jQuery 기반 자사 쇼핑몰 로그인, 회원가입 시스템 구현
<br/><br/>

### 🌐 프로젝트 소개
본 프로젝트는 HTML, CSS, JavaScript, jQuery를 활용하여,
자사 쇼핑몰의 로그인 및 회원가입 시스템을 구현한 웹 개발 프로젝트입니다.
<br/><br/>

### 📅 기획/개발 기간
- 25.07.14. ~ 25.08.01.  
- 디자인·설계 1주 | 개발 2주
<br/><br/>

### 🛠️ 코드 리뷰
(1) 실시간 비밀번호 유효성 검사
- 길이, 대/소문자, 숫자, 특수문자, 반복 문자 조건 충족 여부에 따라 안내 메시지 색상 변경
- joinPw와 joinPwConfirm input에 input 이벤트 연결 후 사용자가 입력할 때마다 검사 함수 실행
- 조건 검사 joinPwInput 함수: 입력값과 대문자/소문자로 변환한 값 비교하며 정규식 활용해 숫자, 특수문자 등 검사
- 조건 충족 시 UI 피드백


```javascript
let joinPw = document.querySelector('.join_pw_box .pw_box');
let joinPwConfirm = document.querySelector('.pw_confirm_box .confirm_box');

joinPw.addEventListener('input', joinPwInput);
joinPwConfirm.addEventListener('input', joinConfirmInput);

function joinPwInput() {
  const pwUpper = joinPw.value !== joinPw.value.toUpperCase();
  const pwLower = joinPw.value !== joinPw.value.toLowerCase();

  const pwNumber = /[0-9]/.test(joinPw.value);
  const pwChar = /[!@#$%]/.test(joinPw.value);
  const pwRepeat = /(.)\1\1/.test(joinPw.value);

  if(joinPw.value.length >= 8 && joinPw.value.length <= 20 && pwUpper && pwLower && pwNumber && pwChar) {
    condition01.style.color = '#4177A4';
    condition02.style.color = '#4177A4';
  } else {
    condition01.style.color = '#666';
    condition02.style.color = '#666';
  }

  if (pwRepeat) {
    condition03.style.color = '#4177A4'
    condition04.style.color = '#4177A4'
  } else if(!pwRepeat) {
    condition03.style.color = '#666';
    condition04.style.color = '#666';
  }
} 
```

(2) 회원가입 폼 제출 시 입력값 검증 후 로컬스토리지 저장
- joinIdInput / joinPw / joinPwConfirm 입력 시 유효성 및 조건 체크 (joinIdSubmit, joinPwInput, joinConfirmInput)
- 회원 정보 객체 { id, pw } 생성 후 JSON 형태로 아이디와 가입 여부 로컬스토리지에 저장

```javascript

const joinSubmitBtn = document.querySelector('.submit_btn');

joinIdInput.addEventListener('input', joinIdSubmit);
joinPw.addEventListener('input', joinPwInput);
joinPwConfirm.addEventListener('input', joinConfirmInput);

joinSubmitBtn.addEventListener('click', () => {
  const joinUserId = joinIdInput.value;
  const joinUserPw = joinPwConfirm.value;
  
  console.log('회원가입 ID:', joinUserId);
  console.log('회원가입 PW:', joinUserPw);

  const joinUserInfo = {
    id: joinUserId,
    pw: joinUserPw
  };

  localStorage.setItem('joinUserInfo', JSON.stringify(joinUserInfo));
  localStorage.setItem('joined', 'true');
  localStorage.setItem('joinedId', joinIdInput.value);

  welcomeMessage.innerText = joinUserId;
  joinWelcomeModal.style.display='block';
  });
};
```

(3) 로컬스토리지 검증 및 로그인 처리
- 사용자가 입력한 아이디와 비밀번호를 1. 기존 데이터베이스(userInfo)와 2. 로컬스토리지(joinUserInfo)에서 검증
- 로그인 성공 시 에러 메시지 숨겨지며 로컬스토리지에 로그인 상태(loggedIn) 저장
- 아이디 / 패스워드 불일치 시 오류 메시지 표시
```javascript

let idTextBox = document.querySelector('.id_box');
let pwTextBox = document.querySelector('.pw_box');
const loginBtn = document.querySelector('.login_btn');

loginBtn.addEventListener('click', login);

function login() {
  const loadUserInfo = JSON.parse(localStorage.getItem('joinUserInfo'));

  let userLogin = false;
  let userIdErr = true;
  let userPwErr = false;

  for (let i=0; i<userInfo.length; i++) {
    if(idTextBox.value === userInfo[i].id) {
      userIdErr = false;
      if(pwTextBox.value === userInfo[i].pw) {
        userLogin = true;
        break;
      } else if (pwTextBox.value !== userInfo[i].pw) {
        userPwErr = true;
        break;
      }
    }
  }

  if (!userLogin && loadUserInfo) {
    if (idTextBox.value === loadUserInfo.id) {
      userIdErr = false;
      if (pwTextBox.value === loadUserInfo.pw) {
        userLogin = true;
      } else if (pwTextBox.value !== loadUserInfo.pw) {
        userPwErr = true;
      }
    }
  }

  if(userLogin) {
    loginErr.style.display = 'none';
    localStorage.setItem('loggedIn', 'true');
    location.href='./index.html'
  } else if (userIdErr) {
    loginErr.style.display = 'block';
    loginErr.innerText = '존재하지 않는 아이디입니다.'
  } else if (userPwErr) {
    loginErr.style.display = 'block';
    loginErr.innerText = '비밀번호가 일치하지 않습니다.'
  } 
}; 
```
<br/>



### 🔍 코드 리뷰 요약
- 비밀번호 입력 시 길이, 대/소문자, 숫자, 특수문자, 반복 문자 조건 실시간 검증
- 회원가입 시 입력한 ID와 비밀번호를 로컬스토리지에 저장, 가입 완료 후 환영 모달 표시
- 로그인 시 데이터베이스와 로컬스토리지를 동시에 검증
- 아이디/비밀번호 오류 처리 후 로그인 성공 시 상태 저장 및 메인 페이지 이동
<br><br/>

### 🔹 학습 포인트
- 실시간 입력 검증을 통해 사용자 친화적인 폼 유효성 검사 구현 경험
- 로컬스토리지를 활용한 클라이언트 측 데이터 저장 및 활용 방식 이해
- 데이터 검증과 상태 관리 로직을 분리하여 유지보수성과 재사용성을 고려한 코드 설계 경험
- 조건별 에러 처리 및 UI 피드백 제공으로 사용자 경험 개선 방법 학습
<br/><br/>
