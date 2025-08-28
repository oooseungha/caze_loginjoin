
// --------------------------------- jQuery
$(function() {
  const eyeBtn = $('.login .login_box .eye_icon')
  const pwBox = $('.login .login_box .pw_box')

  eyeBtn.click(function(){
    pwBox.toggleClass('active');

    if(pwBox.hasClass('active') == true) {
      $(this).find('.fa-eye').attr('class', 'fa-solid fa-eye-slash').parents('.login_box').find('.pw_box').attr('type', 'text');
    } else {
      $(this).find('.fa-eye-slash').attr('class', 'fa-solid fa-eye').parents('.login_box').find('.pw_box').attr('type', 'password');
    }
  }); //password_icon_event

});



// --------------------------------- JavaScript
import userInfo from "./user.js";
document.addEventListener('DOMContentLoaded', () => {
  // ==============================
  // 전역 변수
  // ==============================
  const saveId = document.getElementById('id_chk');
  console.log('saveId:', saveId);
  const autoLogin = document.getElementById('autologin_chk');

  let idTextBox = document.querySelector('.id_box');
  let pwTextBox = document.querySelector('.pw_box');
  const loginBtn = document.querySelector('.login_btn');
  const loginErr = document.querySelector ('.login_err_alert');

  const findIdBtn = document.querySelector('.find_id_btn');
  const findIdModal = document.querySelector('.find_id_wrap');
  const findIdXBtn = document.querySelector('.find_id .modal_x_btn');
  const findIdCancleBtns = document.querySelectorAll('.find_id_wrap .cancle_btn')
  
  const findPwBtn = document.querySelector('.find_pw_btn');
  const findPwModal = document.querySelector('.find_pw_wrap');
  const findPwXBtn = document.querySelector('.find_pw .modal_x_btn');
  const findPwCancleBtns = document.querySelectorAll('.find_pw_wrap .cancle_btn')

  let findIdNameBox = document.querySelector('.find_id_name');
  let findIdNumBox = document.querySelector('.find_id_num');
  let findIdSubmitBtn = document.querySelector('.find_id_submit_btn');
  let findInfoBox = document.querySelector('.find_id_input');
  let findIdResult = document.querySelector('.find_id .find_result');
  let findIdText = document.querySelector('.find_id .find_result_text');
  let findIdPwBtn = document.querySelector('.find_id .find_id_pw_btn');
  let findIdAgainBtn = document.querySelector('.find_id .find_id_again_btn');
  let findPwAgainBtn = document.querySelector('.find_pw .find_pw_again_btn');
  let findIdFail = document.querySelector('.find_id .find_fail');
  let findIdResultBtn = document.querySelector('.find_id .find_login_btn');

  let findPwNameBox = document.querySelector('.find_pw_name');
  let findPwNumBox = document.querySelector('.find_pw_num');  
  let findPwSubmitBtn = document.querySelector('.find_pw_submit_btn');
  let findPwInfoBox = document.querySelector('.find_pw_input');
  let findPwResult = document.querySelector('.find_pw .find_result');
  let findPwFail = document.querySelector('.find_pw .find_fail');
  let findPwResultBtn = document.querySelector('.find_pw .find_login_btn');

  const userId = document.querySelector('.id_box');
  const userPw = document.querySelector('.pw_box');
  const idXBtn = document.querySelector('.id_x_icon');
  const pwXBtn = document.querySelector('.pw_x_icon');



  
  // ==============================
  // addEventListener
  // ==============================
  // @@@@ id/auto_chk_btn_event
  
  saveId.addEventListener('click', idCheck);
  autoLogin.addEventListener('click', totalCheck);


  // @@@@ login_event / login_btn_active_event / login_btn_enter_event
  idTextBox.addEventListener('input', idSubmit);
  pwTextBox.addEventListener('input', idSubmit);
  idTextBox.addEventListener('keydown', loginEnterEvent);
  pwTextBox.addEventListener('keydown', loginEnterEvent);
  loginBtn.addEventListener('click', login);


  // @@@@ find_id / find_pw event
  findIdNameBox.addEventListener('input', findIdSubmit);
  findIdNumBox.addEventListener('input', findIdSubmit);
  findPwNameBox.addEventListener('input', findPwSubmit);
  findPwNumBox.addEventListener('input', findPwSubmit);

  findIdSubmitBtn.addEventListener('click', findIdResultPage);
  findPwSubmitBtn.addEventListener('click', findPwResultPage);

  findIdPwBtn.addEventListener('click', findIdAndPw);
  findIdAgainBtn.addEventListener('click', findIdAgain);
  findPwAgainBtn.addEventListener('click', findPwAgain);

  // @@@@ id/pw_input_btn_event
  userId.addEventListener('input', enterId);
  userPw.addEventListener('input', enterPw);
  idXBtn.addEventListener('click', deleteId);
  pwXBtn.addEventListener('click', deletePw);



  // ==============================
  // reset
  // ==============================

  // @@@@ find_id / find_pw event
  let idState = false;
  let pwState = false;

  

  // ==============================
  // function
  // ==============================
  // @@@@ login_event
  function login() {
    // 로컬스토리지 문자열로 변경
    const loadUserInfo = JSON.parse(localStorage.getItem('joinUserInfo'));
    let userLogin = false;
    let userIdErr = true;
    let userPwErr = false;


    // 아이디/패스워드 데이터베이스에서 비교
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

    // 데이터베이스에서 못 찾으면 로컬스토리지 검사
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


  // @@@@ id/auto_chk_btn_event
  function idCheck() {
    if (saveId.checked === false) {
      autoLogin.checked = false;
    }
  }
  function totalCheck() {
    if (autoLogin.checked === true) {
      saveId.checked = true;
    } else {
      saveId.checked = false;
    }
  }


  // @@@@ login_btn_active_event
  function idSubmit() {
    if (idTextBox.value !== '' && pwTextBox.value !== '') {
      loginBtn.disabled = false;
      loginBtn.classList.add('login_active');
    } else {
      loginBtn.disabled = true;
      loginBtn.classList.remove('login_active');
    }
  }


  // @@@@ login_btn_enter_event
  function loginEnterEvent(event) {
    if (event.key === 'Enter' && !login.disabled) {
      login();
    }
  }
  

  // @@@@ find_id / find_pw event
  findIdBtn.addEventListener('click', function(){
    if(!idState) {
      findIdModal.style.display = 'block';
      idState = true;
      findIdNameBox.value = '';
      findIdNumBox.value = '';
      findIdResult.style.display = 'none';
      findIdFail.style.display = 'none';
      findInfoBox.style.display = 'block';
    } 
  }); 


  // @@@@ find_id_x_btn
  findIdXBtn.addEventListener('click', function() {
    if(idState) {
      findIdModal.style.display = 'none';
      idState = false;
      findIdNameBox.value = '';
      findIdNumBox.value = '';
      findIdResult.style.display = 'none';
      findIdFail.style.display = 'none';
      findInfoBox.style.display = 'block';
      findIdSubmitBtn.classList.remove('find_active');
    }
  }); 


  // @@@@ find_id_cancle_btn
  findIdCancleBtns.forEach((findIdCancleBtn) => {
    findIdCancleBtn.addEventListener('click', function() {
      if(idState) {
        findIdModal.style.display = 'none';
        idState = false;
        findIdNameBox.value = '';
        findIdNumBox.value = '';
        findIdSubmitBtn.classList.remove('find_active');
        findIdResult.style.display = 'none';
        findIdFail.style.display = 'none';
        findInfoBox.style.display = 'block';
      }
    })
  });


  // @@@@ find_id_submit_event
  function findIdSubmit() {
    if (findIdNameBox.value !== '' && findIdNumBox.value !== '') {
      findIdSubmitBtn.disabled = false;
      findIdSubmitBtn.classList.add('find_active')
    } else {
      findIdSubmitBtn.disabled = true;
      findIdSubmitBtn.classList.remove('find_active');
    }
  };


  // @@@@ find_id_result_event
  function findIdResultPage() {
  
    let findId = false;

    for(let i=0; i<userInfo.length; i++) {
      if(findIdNameBox.value === userInfo[i].name && findIdNumBox.value === userInfo[i].num) {
        findIdText.textContent = userInfo[i].id;
        findId = true;
        break;
      } 
    }

    if (findId) {
      findInfoBox.style.display = 'none';
      findIdResult.style.display = 'block';
      findIdFail.style.display = 'none';
    } else {
      findInfoBox.style.display = 'none';
      findIdResult.style.display = 'none';
      findIdFail.style.display = 'block';
    }
  };


 // @@@@ find_id_auto_input_event
  findIdResultBtn.addEventListener('click', () =>{
    findIdModal.style.display = 'none';
    idTextBox.value = findIdText.innerText;
    enterId();
    idState = false;
  });
  findPwResultBtn.addEventListener('click', () =>{
    findPwModal.style.display = 'none';
    idTextBox.value = findPwNameBox.value;
    enterId();
    pwState = false;
  });
    

  // @@@@ find_pw_modal_event
  findPwBtn.addEventListener('click', function(){
    if(!pwState) {
      findPwModal.style.display = 'block';
      pwState = true;
      findPwNameBox.value = '';
      findPwNumBox.value = '';
      findPwResult.style.display = 'none';
      findPwFail.style.display = 'none';
      findPwInfoBox.style.display = 'block';
      findPwSubmitBtn.classList.remove('find_active');
    } 
  }); 


  // @@@@ find_id_x_btn
  findPwXBtn.addEventListener('click', function() {
      findPwModal.style.display = 'none';
      pwState = false;
      findPwNameBox.value = '';
      findPwNumBox.value = '';
      findPwSubmitBtn.classList.remove('find_active');
      findPwResult.style.display = 'none';
      findPwFail.style.display = 'none';
      findPwInfoBox.style.display = 'block';
  }); 

  // @@@@ find_id_cancle_btn
  findPwCancleBtns.forEach((findPwCancleBtn) => {
    findPwCancleBtn.addEventListener('click', function() {
      findPwModal.style.display = 'none';
      pwState = false;
      findPwNameBox.value = '';
      findPwNumBox.value = '';
      findPwSubmitBtn.classList.remove('find_active');
      findPwResult.style.display = 'none';
      findPwFail.style.display = 'none';
      findPwInfoBox.style.display = 'block';
    })
  }); 

  // @@@@ find_id_submit_event
  function findPwSubmit() {
    if (findPwNameBox.value !== '' && findPwNumBox.value !== '') {
      findPwSubmitBtn.disabled = false;
      findPwSubmitBtn.classList.add('find_active')
    } else {
      findPwSubmitBtn.disabled = true;
      findPwSubmitBtn.classList.remove('find_active');
    }
  } 

  // @@@@ find_pw_result_event 
  function findPwResultPage() {
  
    let findPw = false;

    for(let i=0; i<userInfo.length; i++) {
      if(findPwNameBox.value === userInfo[i].id && findPwNumBox.value === userInfo[i].num) {
        findPw = true;
        break;
      } 
    }

    if (findPw) {
      findPwInfoBox.style.display = 'none';
      findPwResult.style.display = 'block';
      findPwFail.style.display = 'none';
    } else {
      findPwInfoBox.style.display = 'none';
      findPwResult.style.display = 'none';
      findPwFail.style.display = 'block';
    }
  };


  // @@@@ find_box_btn_event
  function findIdAndPw() {
    findIdModal.style.display = 'none';
    findPwModal.style.display = 'block';
  };

  function findIdAgain() {
    findIdResult.style.display = 'none';
    findIdFail.style.display = 'none';
    findInfoBox.style.display = 'block';
    findIdNameBox.value = '';
    findIdNumBox.value = '';
  };

  function findPwAgain() {
    findPwResult.style.display= 'none';
    findPwFail.style.display= 'none';
    findPwInfoBox.style.display= 'block';
    findPwNameBox.value = '';
    findPwNumBox.value = '';
  } ;




  // @@@@ id/pw_input_btn_event
  function enterId() {
    if(userId.value.length > 0) {
      idXBtn.style.display = 'block';
    } else {
      idXBtn.style.display = 'none';
    }
  };

  function deleteId() {
    userId.value = '';
    idXBtn.style.display = 'none';
    userId.focus();
    loginBtn.disabled = true;
    loginBtn.classList.remove('login_active')
  } // @@@@ ID_X_btn_event


  
  function enterPw() {
    if(userPw.value.length > 0) {
      pwXBtn.style.display = 'block';
    } else {
      pwXBtn.style.display = 'none';
    }
  };

  function deletePw() {
    userPw.value = '';
    pwXBtn.style.display = 'none';
    userPw.focus();
    loginBtn.disabled = true;
    loginBtn.classList.remove('login_active')
  } // @@@@ PW_X_btn_event


});