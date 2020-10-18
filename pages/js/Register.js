var check = function() {
  if (document.getElementById('pass').value == document.getElementById('passrepeat').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'Passwords match';
    document.getElementById('submit').disabled = false;
  }
  else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Passwords doesnt match!';
    document.getElementById('submit').disabled = true;
  }
}

var checkusername = function() {
  if (document.getElementById('username').value.length >= 6) {
    document.getElementById('messageuser').style.color = 'green';
    document.getElementById('messageuser').innerHTML = 'Username correct';
    document.getElementById('submit').disabled = false;
  }
  else if (document.getElementById('username').value.length > 0 && document.getElementById('username').value.length < 6) {
    document.getElementById('messageuser').style.color = 'red';
    document.getElementById('messageuser').innerHTML = 'Username doesnt correct!';
    document.getElementById('submit').disabled = true;
  }
}

var checkemail = function() {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(document.getElementById('email').value.match(mailformat)) {
    document.getElementById('messageemail').style.color = 'green';
    document.getElementById('messageemail').innerHTML = 'Email correct';
    document.getElementById('submit').disabled = false;
  }
  else {
    document.getElementById('messageemail').style.color = 'red';
    document.getElementById('messageemail').innerHTML = 'Email doesnt correct!';
    document.getElementById('submit').disabled = true;
  }
}

    

  