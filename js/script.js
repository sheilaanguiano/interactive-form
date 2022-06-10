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


/* *********
     INITIAL PAGE SET UP
******************* */
nameField.focus();
otherJob.style.display = 'none';
paypal.setAttribute('hidden', '');
bitcoin.setAttribute('hidden', '');
payment.children[1].setAttribute('selected','')
shirtColor.disabled = true;


// JobTitle Event Listener
jobTitle.addEventListener('change', e => {
    if(jobTitle.options[6].selected){
        otherJob.style.display = '';
    } else {
        otherJob.style.display = 'none';
    }
})

// Shirt Design Event Listener
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

/* *******
    ACTIVITIES EVENT LISTENER
************************** */ 
let totalCost= 0;
activities.addEventListener('change', e => {
    let clicked = e.target
    let eventCost = parseInt(clicked.getAttribute('data-cost'));

    totalCost = clicked.checked ? totalCost + eventCost
                                :  totalCost - eventCost;
    activitiesCost.innerHTML= `Total $${totalCost}`;
      
});

/*
   PAYMENT EVENT LISTENER
*/ 

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


/* **************
   FORM VALIDATION
**************************** */ 


//helper functions

const nameValidator = () =>{
    const nameValue = document.querySelector('#name').value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*?  ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);

    return nameIsValid;

}
 
const emailValidador = () => {
    const emailValue = document.querySelector('#email').value;
    const emailIsValid  = /^[^@]+@[^@]+\.[a-z]+$/i.test(emailValue)

    return emailIsValid;
}

const activitiesValidator = () => {
    let activitiesIsValid = false;
    if(totalCost > 0){
        activitiesIsValid = true
    } 
    return activitiesIsValid;
}

//The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces. The value does not need to be a real credit card number.
const creditCardValidator = () => {
    const cardNum = document.querySelector('#cc-num');
    const cardNumIsValid = /\d{13, 16}/.test(cardNum).value;

    return cardNumIsValid;
}

const zipCodeValidator = () => {
    const zipCode = document.querySelector('#zip').value;
    const zipCodeIsValid = /\d{5}/.test(zipCode)

    return zipCodeIsValid;
}

const cvvValidator = () => {
    const cvv = () => {
        const cvv = document.querySelector('#cvv').value;
        const cvvIsValid = /\d{3}/.test(cvv);

        return cvvIsValid;
    }
}
//The "Zip code" field must contain a 5 digit number.
//The "CVV" field must contain a 3 digit number.



form.addEventListener('submit', e =>{
    e.preventDefault();
    console.log(nameValidator());
    console.log(emailValidador());
    console.log(activitiesValidator());

});