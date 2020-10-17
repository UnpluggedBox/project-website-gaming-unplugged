var checklogin = function() {
    if (document.getElementById('uname').value ==
      document.getElementById('psw').value) {
      document.getElementById('login').disabled = false;
    } else {
      document.getElementById('login').disabled = true;
    }
  }
