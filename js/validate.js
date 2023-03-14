
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
//_________________________________________________________________________

async function handleContactForm(e) {
    e.preventDefault()  //förhindra standardbeteende
    const errors = []   //listar false
    const errorMessage = document.getElementById('errorMessage')    //hämtar elementet errormessage
    errorMessage.innerHTML = ''

    for(let element of e.target) {
        if(element.required) {  //skapa en errorlist - för varje element som är required läggs det till i listan
            const errorElement = document.getElementById(`${element.id}-error`)
            
            if (element.value.length === 0) {               //om elementets längd är 0 - skriv ut att elementet är required
                errorElement.innerHTML = `${element.id} is required.`
                errors.push(false)                              //skicka in en false i errors-listan
            } else {                                           //annars - skriv inte ut något
                errorElement.innerHTML = ``

                switch(element.type) {
                    case 'name':                        //lagt till case name
                        errors.push(validateName())
                        break;
                    case 'email':                              //beroende på vad det är för typ av element 
                        errors.push(validateEmail())        //validera elementet - skicka true eller false till errors
                        break
                    case 'comments':
                        errors.push(validateComments())   //tagit bort comments från mellan parenteserna i funktionen
                        break
                }
            }
        }
    }

    if (!errors.includes(false)) {              //om errors inte innehåller false- värden
 
        const data = {
            name: e.target['name'].value,
            email: e.target['email'].value,
            comments: e.target['comments'].value
        }

            //skicka formuläret:
        const res = await fetch('https://kyh-net22.azurewebsites.net/api/contacts', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
                // 'Autorization': `bearer ${sessionStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(data)
        })

        if (res.status === 200) {
           const result = await res.text()
           sessionStorage.setItem('accessToken', result)

        } else {
            errorMessage.innerHTML = 'Incorrect email or password'
        }
    }
}