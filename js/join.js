
// --------------------------------- jQuery
$(function() {
  // ==============================
  // 전역 변수
  // ==============================
  const eyeBtn = $('.join .join_wrap .join_pw_box .eye_icon');
  const pwBox = $('.join .join_wrap .join_pw_box .pw_box');

  const confirmEyeBtn = $('.join .join_wrap .pw_confirm_box .eye_icon');
  const confirmBox = $('.join .join_wrap .pw_confirm_box .confirm_box');

  
  // ==============================
  // event
  // ==============================
  // @@@@ password_icon_event
  eyeBtn.click(function(){
    pwBox.toggleClass('active');

    if(pwBox.hasClass('active') == true) {
      $(this).find('.fa-eye').attr('class', 'fa-solid fa-eye-slash').parents('.join_pw_box').find('.pw_box').attr('type', 'text');
    } else {
      $(this).find('.fa-eye-slash').attr('class', 'fa-solid fa-eye').parents('.join_pw_box').find('.pw_box').attr('type', 'password');
    }
  }); 

 // @@@@ confirm_password_icon_event
  confirmEyeBtn.click(function(){
    confirmBox.toggleClass('active');

    if(confirmBox.hasClass('active') == true) {
      $(this).find('.fa-eye').attr('class', 'fa-solid fa-eye-slash').parents('.pw_confirm_box').find('.confirm_box').attr('type', 'text');
    } else {
      $(this).find('.fa-eye-slash').attr('class', 'fa-solid fa-eye').parents('.pw_confirm_box').find('.confirm_box').attr('type', 'password');
    }
  });

});





// --------------------------------- JavaScript
import userInfo from "./user.js";
document.addEventListener('DOMContentLoaded', () => {
  // ==============================
  // 전역 변수
  // ==============================
  let joinIdInput = document.querySelector('.join_id_input');
  const idChkBtn = document.querySelector('.id_chk_btn');
  const joinIdAlert = document.querySelector('.id_chk_alert');

  let joinPw = document.querySelector('.join_pw_box .pw_box');
  let joinPwConfirm = document.querySelector('.pw_confirm_box .confirm_box');
  const condition01 = document.querySelector('.pw_condition_01');
  const condition02 = document.querySelector('.pw_condition_02');
  const condition03 = document.querySelector('.pw_condition_03');
  const condition04 = document.querySelector('.pw_condition_04');
  const condition05 = document.querySelector('.pw_condition_05');
  const condition06 = document.querySelector('.pw_condition_06');

  const zipCodeBtn = document.querySelector('.zip_code_btn');
  const deliverZipCodeBtn = document.querySelector('.deliver_zip_code_btn');

  let telFirst = document.getElementById('tel_1st');
  let telSecond = document.getElementById('tel_2nd');
  let phoneNumFirst = document.getElementById('phone_num_1st');
  let phoneNumSecond = document.getElementById('phone_num_2nd');
  const phoneNumBtn = document.querySelector('.phone_num_btn');

  const sendCodeBtn = document.querySelector('.phone_num_btn');
  const certifyTimer = document.querySelector('.timer');

  const email = document.getElementById('email');

  const totalTerms = document.getElementById('term_01');
  const termsEls = document.querySelectorAll('.terms_el');
  const term01 = document.getElementById('term_02');
  const term02 = document.getElementById('term_03');
  const term03 = document.getElementById('term_04');
  const term04 = document.getElementById('term_05');
  
  const infoChk = document.getElementById('deliver_info');

  const joinSubmitBtn = document.querySelector('.submit_btn');
  const joinSubmitAlert = document.querySelector('.submit_alert');
  const requiredInfos = document.querySelectorAll('.required_info');

  const joinWelcomeModal = document.querySelector('.welcome_wrap');
  const welcomeMessage = document.querySelector('.welcome_message .user_id');



  // ==============================
  // addEventListener
  // ==============================
  joinIdInput.addEventListener('input', joinIdSubmit);
  joinPw.addEventListener('input', joinPwInput);
  joinPwConfirm.addEventListener('input', joinConfirmInput);

  zipCodeBtn.addEventListener('click', zipCodeSearch);
  deliverZipCodeBtn.addEventListener('click', deliverZipCodeSearch);

  telFirst.addEventListener('keyup', moveNum);
  phoneNumFirst.addEventListener('keyup', movePhoneNum);
  phoneNumFirst.addEventListener('input', phoneNumInput);
  phoneNumSecond.addEventListener('input', phoneNumInput);

  totalTerms.addEventListener('click', totalTermsChk);
  term01.addEventListener('click', termChk);
  term02.addEventListener('click', termChk);
  term03.addEventListener('click', termChk);
  term04.addEventListener('click', termChk);

  
  // ==============================
  // reset
  // ==============================
  joinIdAlert.style.display='none';
  let countdown;


  // ==============================
  // function
  // ==============================

  // @@@@ join_id_check_event
  function joinIdSubmit() {
    if (joinIdInput.value !== '') {
      idChkBtn.disabled = false;
      idChkBtn.classList.add('join_id_active');
    } else {
      idChkBtn.disabled = true;
      idChkBtn.classList.remove('join_id_active');
      joinIdAlert.style.display = 'none';
    }
  }

  idChkBtn.addEventListener('click', () => {
    let idDoubleChk = false;

    for(let i=0; i<userInfo.length; i++) {
      if (joinIdInput.value === userInfo[i].id) {
        idDoubleChk = true;
        break;
      }
    }

    joinIdAlert.style.display = 'block';
    if (idDoubleChk) {
      joinIdAlert.innerText = '이미 사용 중인 아이디입니다.';
    } else {
      joinIdAlert.innerText = '사용 가능한 아이디입니다.';
    }
  }); 


  // @@@@ join_pw_event
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


  // @@@@ pw_compare_event
  function joinConfirmInput() {
    if(joinPwConfirm.value === joinPw.value) {
      condition05.style.color = '#4177A4';
      condition06.style.color = '#4177A4';
      } else if (joinPwConfirm.value !== joinPw.value) {
      condition05.style.color = '#666';
      condition06.style.color = '#666';
      } else if (joinConfirmInput = '') {
      condition05.style.color = '#666';
      condition06.style.color = '#666'; 
      }
  }
  

  // @@@@ address_zipcode_event
  function zipCodeSearch() {
    new daum.Postcode({
    oncomplete: function(data) {

    let addr = '';
    let extraAddr = '';

    if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
    } else {
        addr = data.jibunAddress;
    }

    if(data.userSelectedType === 'R'){
        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraAddr += data.bname;
        }
        if(data.buildingName !== '' && data.apartment === 'Y'){
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if(extraAddr !== ''){
            extraAddr = ' (' + extraAddr + ')';
        }
        document.getElementById("user_extra_address").value = extraAddr;
    
    } else {
        document.getElementById("user_extra_address").value = '';
    }

    document.getElementById('user_zipcode').value = data.zonecode;
    document.getElementById('user_address').value = addr;
    document.getElementById('user_detail_address').focus();
    }
  }).open();
  };


  // @@@@ deliver_address_zipcode_event
  function deliverZipCodeSearch() {
    new daum.Postcode({
    oncomplete: function(data) {

    let addr = '';
    let extraAddr = '';

    if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
    } else {
        addr = data.jibunAddress;
    }

    if(data.userSelectedType === 'R'){
        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraAddr += data.bname;
        }
        if(data.buildingName !== '' && data.apartment === 'Y'){
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if(extraAddr !== ''){
            extraAddr = ' (' + extraAddr + ')';
        }
        document.getElementById("deliver_user_extra_address").value = extraAddr;
    
    } else {
        document.getElementById("deliver_user_extra_address").value = '';
    }

    document.getElementById('deliver_user_zipcode').value = data.zonecode;
    document.getElementById('deliver_user_address').value = addr;
    document.getElementById('deliver_user_detail_address').focus();
    }
  }).open();
  };


  // @@@@ num / phonenum_move_event
  function moveNum() {
    if(telFirst.value.length >= 4) {
      telSecond.focus();
    }
  }

  function movePhoneNum() {
    if(phoneNumFirst.value.length >= 4) {
      phoneNumSecond.focus();
    }
  }

  function phoneNumInput() {
    if (phoneNumFirst.value.length >= 4 && phoneNumSecond.value.length >= 4) {
      phoneNumBtn.disabled = false;
      phoneNumBtn.classList.add('phone_num_active');
    } else {
      phoneNumBtn.disabled = true;
      phoneNumBtn.classList.remove('phone_num_active');
    }
  }


  // @@@@ send_code / phonenum_timer_event
  sendCodeBtn.addEventListener('click', function () {
    let time = 180;
    clearInterval(countdown); 

    countdown = setInterval(function () {

      let min = Math.floor(time / 60);
      let sec = time % 60;

      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      certifyTimer.innerText = min + ":" + sec + " 인증번호가 발송되었습니다. 인증 시간 내로 입력해 주세요.";
      time = time - 1;
      if (time < 0) {
        clearInterval(countdown);
        certifyTimer.innerText = "00:00 인증 시간이 만료되었습니다. 다시 인증번호를 발송해 주세요.";
      }
    }, 1000);

    sendCodeBtn.innerText = '인증번호 재발송';

  });


  // @@@@ emeil_select_event
  email.addEventListener('change', () => {
    let emailDomain = email.options[email.selectedIndex].innerText;

    if (emailDomain === '직접 입력') {
      document.querySelector('.email_input').value = '';
      document.querySelector('.email_input').focus()
    } else {
      document.querySelector('.email_input').value = emailDomain;
    }
  });


  // @@@@ join_terms_event
  function totalTermsChk() {
    if (totalTerms.checked) {
      termsEls.forEach((termsEl) => {
        termsEl.checked = true;
      });
    } else {
      termsEls.forEach((termEl) => {
        termEl.checked = false;
      })
    }
  } // @@@@ totalTerms_chk_event


  function termChk() {
    if(term01.checked && term02.checked && term03.checked && term04.checked) {
      totalTerms.checked = true;
    } else {
      totalTerms.checked = false;
    }
  }  // @@@@ terms_chk_event



  // @@@@ join_deliver_info_chk_event
  infoChk.addEventListener('click', function() {

    if(infoChk.checked) {
      document.querySelector('.deliver_name_input').value = document.querySelector('.name_input').value;

      document.querySelector('.deliver_zip_code').value = document.querySelector('.zip_code').value;
      document.querySelector('.deliver_address_01').value = document.querySelector('.address_01').value;
      document.querySelector('.deliver_address_02').value = document.querySelector('.address_02').value;
      document.querySelector('.deliver_address_03').value = document.querySelector('.address_03').value;

      document.getElementById('deliver_phone_num_1st').value = document.getElementById('phone_num_1st').value;
      document.getElementById('deliver_phone_num_2nd').value = document.getElementById('phone_num_2nd').value;
    } else if (infoChk.checked === false) {
      document.querySelector('.deliver_name_input').value = '';
      document.querySelector('.deliver_zip_code').value = '';
      document.querySelector('.deliver_address_01').value = '';
      document.querySelector('.deliver_address_02').value = '';
      document.getElementById('deliver_phone_num_1st').value = '';
      document.getElementById('deliver_phone_num_2nd').value = '';
    }

  });


  // @@@@ join_required_info
  requiredInfos.forEach((requiredInfo) => {
    requiredInfo.addEventListener('input', joinSubmit);
  });

  function joinSubmit() {

    let requiredInfoFill = true;

    for (let requiredInfo of requiredInfos) {
      if (requiredInfo.value.length <= 0) {
        requiredInfoFill = false;
        break;
      }

      if (requiredInfoFill) {
        joinSubmitBtn.disabled = false;
        joinSubmitAlert.style.display = 'none';
      } else {
        joinSubmitBtn.disabled = true;
        joinSubmitAlert.style.display = 'block';
      }
    
  }


  // @@@@ join_submit_btn_event
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

  const toLoginBtn = document.querySelector('.to_login_btn');

  toLoginBtn.addEventListener('click', () => {
    window.location.href = './login.html'
  });

});

