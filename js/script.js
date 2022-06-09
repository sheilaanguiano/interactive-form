//Start from Step 3
const nameField = document.querySelector('#name');
const jobTitle = document.querySelector('#title');
const otherJob = document.querySelector('#other-job-role');
const shirtDesign = document.querySelector('#design');
const shirtColor = document.querySelector('#color');
const activities = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
const checkboxes = document.querySelectorAll('.activities input');


nameField.focus();
otherJob.style.display = 'none';
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


