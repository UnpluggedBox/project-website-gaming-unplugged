var check = function() {
    if (document.getElementById('pass').value ==
      document.getElementById('passrepeat').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'matching';
      document.getElementById('submit').disabled = false;
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'not matching';
      document.getElementById('submit').disabled = true;
    }
  }