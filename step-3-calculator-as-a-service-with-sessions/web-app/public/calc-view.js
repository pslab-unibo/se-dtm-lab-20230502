/*  View */

class View {

    constructor(){        
    }

    update(value){
        document.form1.textview.value = value;
    }

    showUserId(userId){
        document.getElementById('userIdDiv').style.display = "block"
        document.getElementById('userId').innerHTML = userId
    }

    hideRegistration(){
        document.getElementById('registrationDiv').style.display = "none"
    }

    hideLogin(){
        document.getElementById('loginDiv').style.display = "none"
    }

    showCalculator(userId){
        document.getElementById('calcDiv').style.display = "block"
        document.getElementById('banner').innerHTML = '.:: Calculator Service | User: ' + userId + ' ::.' 
    }

}

let view = new View();
