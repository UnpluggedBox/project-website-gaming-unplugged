var uname = document.forms['form']['uname']
var psw = document.forms['form']['psw']

uname.addEventListener('textInput', user_verify)
psw.addEventListener('textInput', psw_verify)

function valid() {
    if (uname.value.length < 5 && uname.value.length > 5) {
        uname.focus();
        return false
    }
    if (psw.value.length < 5 && psw.value.length > 5) {
        psw.focus();
        return false
    }
}

function user_verify() {
    if (uname.value.length == 5) {
        return true;
    }
}
function psw_verify() {
    if (psw.value.length == 5) {
        return true;
    }
}
