// VARIBALES
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');

var signupArray=[];


var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

// LOCAL STORAGE
if(localStorage.getItem('users') != null){
    signupArray = JSON.parse(localStorage.getItem("users"));
}

// SIGN UP
function empty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}

function exist() {
    for (var i = 0; i < signupArray.length; i++) {
        if (signupArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}
function validatEmail(){
    var regex = /^\S+@\S+\.\S+$/;
    return regex.test(signupEmail.value)

}

function signUp(){

    if (empty() == false) {
        document.getElementById('error').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }

    if(validatEmail() == false ){
        document.getElementById('error').innerHTML = '<span class="text-danger m-3">Email is not valid</span>'
        return false
    }

    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }

    if (exist() == false) {
        document.getElementById('error').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else{
        signupArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signupArray))

        document.getElementById('error').innerHTML = '<span class="text-success m-3">Success</span>'
    }
}
console.log(signupArray);



// change URL
var pathArray = window.location.pathname.split( '/' );
var newPathname = "";
for (i = 0; i < pathArray.length - 1; i++) {
    newPathname += '/' + pathArray[i]
}

// LOGIN (signin)
function loginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}
function login(){
    if(loginEmpty() == false){
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
    return false
    }

    var email = signinEmail.value;
    var password = signinPassword.value;
    for(var i=0 ; i<signupArray.length ; i++){
        if(signupArray[i].email.toLowerCase() == email.toLowerCase() && signupArray[i].password.toLowerCase() == password.toLowerCase() ){
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-success">correct</span>'
            //                     key            value
            localStorage.setItem('username', signupArray[i].name)

            if (newPathname == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(newPathname + '/home.html')}

        }else{
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
}

// WELCOME HOME
var username = localStorage.getItem('username');
if(username){
    document.getElementById("userName").innerHTML = "Welcome " + username;
}



// LOG OUT

function logout() {
    localStorage.removeItem('username')
}




