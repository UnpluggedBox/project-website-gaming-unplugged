var checklogin = function() {
    if (document.getElementById('uname').value == 'admin' && document.getElementById('psw').value == 'admin') {
      return true
    } else {
      document.getElementById('messagelogin').style.color = 'red';
      document.getElementById('messagelogin').innerHTML = 'Wrong Username or Password';
      return false
    }
  }
