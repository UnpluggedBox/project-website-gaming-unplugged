var pass = document.forms['form']['pass']
var passrepeat = document.forms['form']['passrepeat']

pass.addEventListener('textInput', pass_verify)
passrepeat.addEventListener('textInput', passrep_verify)

function valid() {
    if (pass.value != passrepeat.value) {
        pass.focus();
        return false
    }
    if (pass.value != passrepeat.value) {
        passrepeat.focus();
        return false
    }
}

function pass_verify() {
    if (pass.value == passrepeat.value) {
        return true;
    }
}
function passrep_verify() {
    if (pass.value == passrepeat.value) {
        return true;
    }
}