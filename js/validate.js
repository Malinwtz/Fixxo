
const nameError = document.getElementById('name-error')
const emailError = document.getElementById('email-error')
const commentsError = document.getElementById('comments-error')
const submitError = document.getElementById('submit-error')

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
        return false;
    }    
    if(!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i.test(email)){
        emailError.innerHTML = 'Invalid email';
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
    else {
        commentsError.innerHTML = '<i class="fas fa-check"></i>';
        return true;
    }
}

function validateForm(){
    if(!validateName() || !validateEmail() || !validateComments()){
        submitError.innerHTML = 'Fill in all columns before submitting the form';

        return false;
    }
    submitError.innerHTML = 'Comment sent!';
    return true;
}
//_________________________________________________________________________

async function handleContactForm(e) {
    e.preventDefault()
    const errors = []   
    const errorMessage = document.getElementById('submit-error')
    errorMessage.innerHTML = ''

    for(let element of e.target) {
        if(element.required) {  
            const errorElement = document.getElementById(`${element.id}-error`)
            if (element.value.length === 0) {              
                errorElement.innerHTML = `${element.id} is required.`
                errors.push(false)                              
            } else {                                           
                errorElement.innerHTML = ``
                switch(element.id) {
                    case 'name':                       
                        errors.push(validateName())
                        break;
                    case 'email':                              
                        errors.push(validateEmail())        
                        break
                    case 'comments':
                        errors.push(validateComments())   
                        break
                }
            }
        }
    }
    if (!errors.includes(false)) {           
        const data = {
            name: e.target['name'].value,
            email: e.target['email'].value,
            comments: e.target['comments'].value
        }
        //send form
        try {
            const res = await fetch('https://kyh-net22.azurewebsites.net/api/contacts', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${sessionStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(data)
            });
            if (res.status === 200) {
                        
                const result = await res.text()
                sessionStorage.setItem('accessToken', result)
                e.target.reset();
            } 
            else {
                errorMessage.innerHTML = 'Error submitting form.'
            }

        }
        catch(error){
            errorMessage.innerHTML = 'Error submitting form.'
        }
    }
}

