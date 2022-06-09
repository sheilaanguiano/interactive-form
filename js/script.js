// CONSTANTS
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



nameField.focus();
otherJob.style.display = 'none';
paypal.setAttribute('hidden', '');
bitcoin.setAttribute('hidden', '');
payment.children[1].setAttribute('selected','')

shirtColor.disabled = true;

jobTitle.addEventListener('change', e => {
    if(jobTitle.options[6].selected){
        otherJob.style.display = '';
    } else {
        otherJob.style.display = 'none';
    }
})


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

/*
    ACTIVITIES EVENT LISTENER
*/ 
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

