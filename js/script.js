//Start from Step 3
const nameField = document.querySelector('#name');
const jobTitle = document.querySelector('#title');
const otherJob = document.querySelector('#other-job-role');
const shirtDesign = document.querySelector('#design');
const shirtColor = document.querySelector('#color');

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
     if(shirtDesign.options[1].selected){
        shirtColor.disabled = false; 

         for(let i = 0; i < shirtColor.length; i++){
             if(shirtColor.children[i].getAttribute('data-theme') === 'js puns'){
                shirtColor.children[i].style.display = 'inline';
             } else {
                shirtColor.children[i].style.display = 'none';
             }
         }
    } else if(shirtDesign.options[2].selected) {
        shirtColor.disabled = false; 

        for(let i = 0; i < shirtColor.length; i++){
            if(shirtColor.children[i].getAttribute('data-theme') === 'heart js'){
                shirtColor.children[i].style.display = 'inline';
            } else {
               shirtColor.children[i].style.display = 'none';
            }
        }
    }
});