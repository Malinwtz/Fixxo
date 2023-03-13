
const nameError = document.getElementById('name-error')
const emailError = document.getElementById('email-error')
const commentsError = document.getElementById('comments-error')
const sumbitError = document.getElementById('submit-error')

// //submit form
// const handleSubmit = (e) => {
//     e.preventDefault()
//     const errors = []

//     for(let element of e.target) {
//         if (element.required) {
//             switch(element.type) {
//                 case 'email':
//                     if (!validateEmail(element.value))
//                         errors.push(element)
//                     break;
//                 case 'text':
//                     if (!validateName(element.value))
//                         errors.push(element)
//                     break;
//                 case 'password':
//                     if (!validatePassword(element.value))
//                         errors.push(element)
//                     break; 
//             }
//         }
//     }

//     if(errors.length == 0)
//         window.location.reload('success.html')
// }

//funktion som validerar det som skickas in i funktionen
// function validate(event){
//     switch(event.target.type) {
//         case 'name':
//             validateName(event.target.value)
//             break;
//         case 'email':
//             validateEmail(event.target.value)
//             break;
//         case 'password':
//             validatePassword(event.target.value)
//             break;
//     }
// }

//validera namn

function validateName(){
    const name = document.getElementById('name').value;
    if(name.length == 0){
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if(!name.match(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/)){
        nameError.innerHTML = 'Write full name';
        return false;
    }
    nameError.innerHTML = '<i class="fas fa-check"></i>';
    return true;
}


function validateEmail(){
    const email = document.getElementById('email').value;

    if(email.length == 0){
        emailError.innerHTML ='Email is required';
        return false
    }    
    if(!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)){
        emailError.innerHTML = 'Email invalid';
        return false;
    }
    emailError.innerHTML = '<i class="fas fa-check"></i>';
    return true;
}


function validateComments(){
    const comments = document.getElementById('comments').value;
    var required = 10;
    var left = required - comments.length;
    if(left > 0){
        commentsError.innerHTML = left + ' more characters required';
        return false;
    }
    commentsError.innerHTML = '<i class="fas fa-check"></i>';
    return true;
}


function validateForm(){
    if(!validateName() || !validateEmail() || !validateComments()){
        sumbitError.innerHTML = 'Fill in all columns before submitting the form';

        return false;
    }
    sumbitError.innerHTML = 'Comment sent!';
    return true;
}