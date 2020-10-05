var uname = document.forms['form']['uname']
var psw = document.forms['form']['psw']

uname.addEventListener('textInput', user_verify)
psw.addEventListener('textInput', pass_verify)

function valid() {
    if (uname != 'admin') {
        uname.focus();
        return false
    }
    if (psw != 'admin') {
        psw.focus();
        return false
    }
}

function user_verify() {
    if (uname == 'admin') {
        return true;
    }
}
function pass_verify() {
    if (psw == 'admin') {
        return true;
    }
}