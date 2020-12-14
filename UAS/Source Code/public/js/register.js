var check = function() {

  if (document.getElementById('pass').value == document.getElementById('passrepeat').value) {
    setTimeout(function(){
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'Passwords match';
    document.getElementById('submit').disabled = false; }, 2000);
  }
  else {
    setTimeout(function(){
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Passwords doesnt match!';
    document.getElementById('submit').disabled = true; }, 2000);
  }
}

var checkusername = function() {
  if (document.getElementById('username').value.length >= 6) {
    setTimeout(function(){
    document.getElementById('messageuser').style.color = 'green';
    document.getElementById('messageuser').innerHTML = 'Username correct';
    document.getElementById('submit').disabled = false; }, 2000);
  }
  else if (document.getElementById('username').value.length < 6) {
    setTimeout(function(){
    document.getElementById('messageuser').style.color = 'red';
    document.getElementById('messageuser').innerHTML = 'Username is not correct!';
    document.getElementById('submit').disabled = true; }, 2000);
  }
}

var checkemail = function() {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(document.getElementById('email').value.match(mailformat)) {
    setTimeout(function(){
    document.getElementById('messageemail').style.color = 'green';
    document.getElementById('messageemail').innerHTML = 'Email valid';
    document.getElementById('submit').disabled = false; }, 2000);

  }
  else {
    setTimeout(function(){
    document.getElementById('messageemail').style.color = 'red';
    document.getElementById('messageemail').innerHTML = 'Email invalid!';
    document.getElementById('submit').disabled = true; }, 2000);
  }
}

    

  