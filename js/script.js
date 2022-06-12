/* *********
     VARIABLES
******************* */
const nameField = document.querySelector('#name');
const jobTitle = document.querySelector('#title');
const otherJob = document.querySelector('#other-job-role');
const shirtDesign = document.querySelector('#design');
const shirtColor = document.querySelector('#color');
const activities = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const form = document.getElementsByTagName('form')[0];
const email = document.querySelector('#email');
const cardNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const checkboxes = activities.querySelectorAll('[type="checkbox"]');

/* *********************
     INITIAL PAGE SET UP
*************************************** */
nameField.focus();
otherJob.style.display = 'none';
paypal.setAttribute('hidden', '');
bitcoin.setAttribute('hidden', '');
payment.children[1].setAttribute('selected','')
shirtColor.disabled = true;

/* *************
    JOB TITLE EVENT LISTENER
********************************** */ 
jobTitle.addEventListener('change', e => {
    if(jobTitle.options[6].selected){
        otherJob.style.display = '';
    } else {
        otherJob.style.display = 'none';
    }
})

/* **************
    SHIRT DESIGN AND COLOR CASCADING MENU
************************************* */ 
shirtDesign.addEventListener('change', e => {
    shirtColor.disabled = false;

    for(let i = 0; i < shirtColor.length; i++){
        
        if(e.target.value !== shirtColor.children[i].getAttribute('data-theme')){
            shirtColor.children[i].style.display = 'none';
        } else {
            shirtColor.children[i].style.display = 'initial'
        } 
    }
});

/* ************************
    ACTIVITIES EVENT LISTENERS + ACCESIBILITY EVENT LISTENERS
****************************************** */ 
let totalCost= 0;
activities.addEventListener('change', e => {
    let clicked = e.target
    let eventCost = parseInt(clicked.getAttribute('data-cost'));

    totalCost = clicked.checked ? totalCost + eventCost
                                :  totalCost - eventCost;
    activitiesCost.innerHTML= `Total $${totalCost}`;
      
});

activities.addEventListener('focus', e => {
    let target = e.target;
    for(let i=0; i< checkboxes.length; i++){
        if(target === checkboxes[i]){
            checkboxes.parentNode.classList.add('focus');         
        }
    }  
})

activities.addEventListener('blur', e => {
    for(let i=0; i< checkboxes.length; i++){
        if(target === checkboxes[i]){
            checkboxes.parentNode.classList.remove('focus');         
        }   
    }
});


/* **************************
   PAYMENT EVENT LISTENER
*************************************** */ 

payment.addEventListener('change', e => {
    let option = e.target.value;
    let paymentOptions = [creditCard, paypal, bitcoin];
    

    for(let i = 0; i< paymentOptions.length; i++){   
        if(option === paymentOptions[i].id ){
            paymentOptions[i].hidden = false;
        }else {
            paymentOptions[i].hidden = true;
        }
    } 
});


/* ***************************
   VALIDATION HELPER FUNCTIONS
******************************************** */ 

//Individual validator function (helper functions)

const nameValidator = () =>{
    const nameValue = nameField.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*?  ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);

    console.log(`Name validation test on "${nameValue}" evaluates to ${nameIsValid}`);
    return nameIsValid;
}
 
const emailValidator = () => {
    const emailValue = email.value;
    const emailIsValid  = /^[^@]+@[^@]+\.[a-z]+$/i.test(emailValue)

    console.log(`Email validation test on "${emailValue}" evaluates to ${emailIsValid}`);
    return emailIsValid;
}

const activitiesValidator = () => {
    let activitiesIsValid = false;
    if(totalCost > 0){
        activitiesIsValid = true
    } 
    console.log(`Activities validation test evaluates to ${activitiesIsValid}`);
    return activitiesIsValid;
}


const cardNumValidator = () => {
    const cardNumber = cardNum.value;
    const cardNumIsValid = /\d{13, 16}/.test(cardNumber);
    return cardNumIsValid;
}

const zipCodeValidator = () => {
    const zipCode = zip.value;
    const zipCodeIsValid = /\d{5}/.test(zipCode)
    return zipCodeIsValid;
}


const cvvValidator = () => {
    const cvv = () => {
        const cvv = cvv.value;
        const cvvIsValid = /\d{3}/.test(cvv);
        return cvvIsValid;
    }
}

// Functions to Show or Hide Hints
function showHint(element){
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'inline';
}

function hideHint(element){
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
}

/* ***********************
    FORM VALIDATOR
***************************************** */ 

form.addEventListener('submit', e => {
    e.preventDefault();
    if(!nameValidator()) {
       e.preventDefault();
       showHint(nameField)

    }else{
        hideHint(nameField);
    }

    if(!emailValidator()) {
        e.preventDefault();
        showHint(email);
       console.log('emailValidator prevented submission');
     }else {
         hideHint(email);
     }

     if(!activitiesValidator()) {
         e.preventDefault();
         console.log('activitiesValidator prevented submission');
     }

     if(payment.options[1].value){
        if(!cardNumValidator()){
            e.preventDefault();
            showHint(cardNum);
        } else{
            hideHint(cardNum);

        }
        if(!zipCodeValidator()){
            e.preventDefault();
            showHint(zip);
        } else {
            hideHint(zip);
        }

    
        if(!cvvValidator()) {
             e.preventDefault();
             showHint(cvv)
         } else {
             hideHint(cvv);
         }
     }
});
