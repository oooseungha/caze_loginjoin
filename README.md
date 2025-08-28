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

### 💡 기획의도
**문제점**
- 비밀번호 등 입력 오류에 대한 안내 부족
- 비직관적인 버튼, 피드백, 오류 메시지
- 비밀번호 규칙, 특수문자 처리 등 보안 검증 미흡

**개선 방향**
- 간편하고 안정적으로 로그인 및 회원가입을 할 수 있도록 직관적인 UI/UX 설계에 집중
- 오류 검증과 사용자 안내 메시지를 통해 신뢰도를 높이고, 빠른 접근성을 제공
<br/><br/>

### 📍 프로젝트 목표
- JavaScript와 jQuery를 활용한 실시간 폼 검증 및 이벤트 처리
- 에러 메시지 및 성공 알림 등 UI 상태 변화 동적 처리
- 로컬스토리지를 활용한 아이디 저장 기능 및 사용자 데이터 관리
<br/><br/>

### 🔄 플로우차트
<img width="1920" height="1080" alt="플로우차트" src="https://github.com/user-attachments/assets/02531600-8b02-4f8e-8d62-dda7774419ce" />
<br/><br/>


### 🛠️ 코드 리뷰
(3) 아이디 패스워드 찾고 자동 입력되게

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

(3) 로컬스토리지, 데이터 비교 로그인
```javascript
```
<br/>



### 🔍 코드 리뷰 요약
- Navigate를 통해 /sub 진입 시 기본 카테고리(classic)로 자동 리다이렉트 처리
- Redux Toolkit 활용해 cartSlice로 장바구니 관리, optionCountOneSlice로 옵션 수량 상태 관리
- Footer, Payment 페이지에서 장바구니 데이터 기반으로 총 수량, 총 금액 계산 및 UI 반영
- 결제 페이지에서 모달 상태 관리로 결제 수단 선택 기능 구현
<br><br/>

### 🔹 학습 포인트
- React Router의 Outlet, Navigate를 통한 중첩 라우팅 패턴
- 중첩 라우팅과 리다이렉트를 통한 사용자 흐름 제어 경험
- 장바구니(추가, 삭제, 수량 증감) 같은 실무형 데이터 흐름을 Redux로 일관되게 관리하는 패턴 경험
- useSelector, useDispatch를 통한 React-Redux 연동 방식 이해
- 구조화된 상태 관리와 라우팅 설계가 유지보수성과 확장성 확보에 어떻게 기여하는지 경험
<br/><br/>
