var user = document.forms['form']['uname']
var pass = document.forms['form']['psw']

user.addEventListener('textInput', user_verify)
pass.addEventListener('textInput', pass_verify)

function valid() {
    if (user !== "admin") {
        user.focus();
        return false
    }
    if (pass !== "admin") {
        pass.focus();
        return false
    }
}

function user_verify() {
    if (user = "admin") {
        return true;
    }
}
function pass_verify() {
    if (pass = "admin") {
        return true;
    }
}