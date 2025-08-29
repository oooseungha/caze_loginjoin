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
(1) 비밀번호 유효성 검사
- 사용자가 입력한 비밀번호 실시간 확인
- 길이, 대/소문자, 숫자, 특수문자, 반복 문자 조건 충족 여부에 따라 안내 메시지 색상 변경
```javascript
// 비밀번호 입력 input 박스
let joinPw = document.querySelector('.join_pw_box .pw_box');
// 비밀번호 확인 input 박스
let joinPwConfirm = document.querySelector('.pw_confirm_box .confirm_box');

// 각 input에 이벤트 리스너 연결 (input 값이 바뀔 때마다 실행)
joinPw.addEventListener('input', joinPwInput);
joinPwConfirm.addEventListener('input', joinConfirmInput);

// 비밀번호 입력 시 조건 검사 함수
function joinPwInput() {

  // 대문자가 포함되어 있는지 검사 → 전부 대문자로 바꿨을 때 원래 값과 다르면 대문자가 포함됨
  const pwUpper = joinPw.value !== joinPw.value.toUpperCase();

  // 소문자가 포함되어 있는지 검사 → 전부 소문자로 바꿨을 때 원래 값과 다르면 소문자가 포함됨
  const pwLower = joinPw.value !== joinPw.value.toLowerCase();

  // 숫자가 포함되어 있는지 검사 (정규식)
  const pwNumber = /[0-9]/.test(joinPw.value);

  // 특수문자(!, @, #, $, %) 포함 여부 검사
  const pwChar = /[!@#$%]/.test(joinPw.value);

  // 같은 문자가 3번 연속 반복되는지 검사
  const pwRepeat = /(.)\1\1/.test(joinPw.value);

  // 조건 1~2 : 비밀번호 길이가 8~20자 + 대문자/소문자/숫자/특수문자 모두 포함해야 함
  if(joinPw.value.length >= 8 && joinPw.value.length <= 20 && pwUpper && pwLower && pwNumber && pwChar) {
    condition01.style.color = '#4177A4'; // 조건 충족 -> 파란색
    condition02.style.color = '#4177A4';
  } else {
    condition01.style.color = '#666'; // 조건 불충족 -> 회색
    condition02.style.color = '#666';
  }

  // 조건 3~4 : 같은 문자가 3번 연속 반복될 경우
  if (pwRepeat) {
    condition03.style.color = '#4177A4'
    condition04.style.color = '#4177A4'
  } else if(!pwRepeat) {
    condition03.style.color = '#666';
    condition04.style.color = '#666';
  }
} 
```

(2) 회원가입 시 로컬스토리지 저장
- 사용자가 회원가입 폼에 입력한 ID와 비밀번호를 가져와 객체로 생성한 뒤 로컬스토리지에 저장
- 가입 완료 후 환영 모달에 사용자 이름을 표시
- 회원가입 양식 제출 후 로그인 페이지로 이동
```javascript

// 회원가입 버튼 요소 가져오기
const joinSubmitBtn = document.querySelector('.submit_btn');


// 입력 이벤트 연결
joinIdInput.addEventListener('input', joinIdSubmit); // ID 입력 시 유효성 체크
joinPw.addEventListener('input', joinPwInput); // 비밀번호 입력 시 조건 체크
joinPwConfirm.addEventListener('input', joinConfirmInput); // 비밀번호 확인 입력 시 조건 체크

// 회원가입 양식 제출 이벤트
joinSubmitBtn.addEventListener('click', () => {
  // 입력값 가져오기
  const joinUserId = joinIdInput.value;
  const joinUserPw = joinPwConfirm.value;
  
  console.log('회원가입 ID:', joinUserId);
  console.log('회원가입 PW:', joinUserPw);

  // 사용자 정보 객체 생성
  const joinUserInfo = {
    id: joinUserId,
    pw: joinUserPw
  };

  // localStorage에 회원가입 정보 저장
  localStorage.setItem('joinUserInfo', JSON.stringify(joinUserInfo));
  localStorage.setItem('joined', 'true'); // 회원가입 완료 상태 저장
  localStorage.setItem('joinedId', joinIdInput.value); // 가입한 ID 저장

  // 환영 메시지 표시
  welcomeMessage.innerText = joinUserId;
  joinWelcomeModal.style.display='block'; // 모달 열기
  });
};

// 로그인 페이지 이동 버튼
const toLoginBtn = document.querySelector('.to_login_btn');

toLoginBtn.addEventListener('click', () => {
  window.location.href = './login.html' // 양식 제출 후 로그인 페이지로 이동
});
```

(3) 로컬스토리지 검증 및 로그인 처리
- 사용자가 입력한 아이디와 비밀번호를 기존 데이터베이스(userInfo)와 로컬스토리지(joinUserInfo)에서 검증
- 아이디가 존재하지 않거나 비밀번호가 불일치하면 에러 메시지 표시
- 로그인 성공 시 로컬스토리지에 로그인 상태(loggedIn) 저장 후 메인 페이지로 이동
```javascript

// 로그인 폼 요소 선택
let idTextBox = document.querySelector('.id_box'); // 아이디 입력창
let pwTextBox = document.querySelector('.pw_box'); // 비밀번호 입력창
const loginBtn = document.querySelector('.login_btn'); // 로그인 버튼

// 로그인 버튼 클릭 시 login 함수 실행
loginBtn.addEventListener('click', login);


function login() {
  // 로컬스토리지 회원 정보 문자열로 변경
  const loadUserInfo = JSON.parse(localStorage.getItem('joinUserInfo'));

  // 로그인 상태 및 에러 상태 초기화
  let userLogin = false; // 로그인 성공 여부
  let userIdErr = true; // 아이디 오류 여부
  let userPwErr = false; // 비밀번호 오류 여부


  // 기존 데이터베이스(userInfo)에서 아이디/비밀번호 검증
  for (let i=0; i<userInfo.length; i++) {
    if(idTextBox.value === userInfo[i].id) { // 아이디 일치할 시
      userIdErr = false; // 아이디 오류 아님
      if(pwTextBox.value === userInfo[i].pw) {  // 아이디 일치하며 비밀번호 일치할 시
        userLogin = true; // 로그인 성공
        break;
      } else if (pwTextBox.value !== userInfo[i].pw) { // 비밀번호 불일치
        userPwErr = true; // 비밀번호 오류
        break;
      }
    }
  }

  // 데이터베이스에서 못 찾으면 로컬스토리지 검사
  if (!userLogin && loadUserInfo) {
    if (idTextBox.value === loadUserInfo.id) { // 아이디 일치할 시
      userIdErr = false; // 아이디 오류 아님
      if (pwTextBox.value === loadUserInfo.pw) { // 아이디 일치하며 비밀번호 일치
        userLogin = true; // 로그인 성공
      } else if (pwTextBox.value !== loadUserInfo.pw) { // 비밀번호 불일치
        userPwErr = true; // 비밀번호 오류
      }
    }
  }

  // 로그인 결과에 따른 처리
  if(userLogin) {
    loginErr.style.display = 'none'; // 에러 메시지 숨김
    localStorage.setItem('loggedIn', 'true'); // 로그인 상태 저장
    location.href='./index.html' // 메인 페이지 이동
  } else if (userIdErr) { // 아이디 오류일 시
    loginErr.style.display = 'block';
    loginErr.innerText = '존재하지 않는 아이디입니다.'
  } else if (userPwErr) { // 비밀번호 오류일 시
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
