/********** 
 * 
 * email works through EmailJs :
 * https://www.emailjs.com/
 * 
 * emailjs does all the work on the backend
 * In here all we are doing is client-side validation before allowing an email to send
 * 
 * **********/


 function createEventListeners() {
    const submitButton = document.getElementsByClassName("contact_btn");

    for(i in submitButton) {
        if(submitButton[i].addEventListener) {
            submitButton[i].addEventListener("click", sendEmail, false);
        } else if(submitButton[i].attachEvent) {
            submitButton[i].attachEvent("onclick", sendEmail, false);
        }
    }
 }

 function sendEmail(x) {
     x.preventDefault();
    const target = x.target;
    const formFields = checkFormFields(target);
    const sendCheck = inputFields => inputFields.every(Boolean);

    //check for false values
        //if there is an error for that item create error message
        //if there is not an error for that item remove the error message
    for(i in formFields) {
        if(!formFields[i]) {
            createError(i, target);
        } else {
            removeError(i, target);
        }
    }

    //check if email can send by making sure there are no false values present
    if(sendCheck(formFields)) {
        console.log("the email can send!");
  
        //send the emeail 
        const serviceID = 'default_service';
        const templateID = 'contact_form';
        const formID = this.parentNode.parentNode;

        /*emailjs.sendForm(serviceID, templateID, formID)
            .then(() => {
                alert('sent!');
            }, (err) => {
                alert(JSON.stringify(err));
            });*/
        
        // empty the contact form and show a sent pop-up

    } else {
        console.log("DO NOT SEND THE EMAIL");
        return;
    }

 }

 function checkFormFields(target) {
    let allFields = target.parentNode.parentNode.getElementsByClassName("form__group");
    let fieldsToCheck = [];
    let fieldsPassing = [];
    
    //do not pull the last form group (its the submit button)
        //set to 3 to prevent pulling button into array
    for(i=0; i < 3; i++) {
        if(allFields[i].childNodes) {
            fieldsToCheck.push(allFields[i].childNodes[1]); 
        }
    }

    for(i in fieldsToCheck) {
        const inputPassing = validateInput(fieldsToCheck[i]);
        fieldsPassing.push(inputPassing);
    }

    return fieldsPassing;
 }

 function validateInput(fieldToCheck) {
    let fieldValid; 
    const inputValue = fieldToCheck.value;
    const inputField = fieldToCheck;
    const nameCheck = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const messageCheck = /^[\w\d.'"?!,@$\(\)\-\n\r\t\s]+[\w\d.'"?!,@$\(\)\-\n\r\t\s]*$/;

    //check type of field
        //check for match
    if(inputField.id === "name" || inputField.id === "name-quickview") {
        if(nameCheck.test(inputValue)) {
            fieldValid = true;
        } else {
            fieldValid = false;
        }
    } else if(inputField.id === "email" || inputField.id === "email-quickview") {
        if(emailCheck.test(inputValue)) {
            fieldValid = true;
        } else {
            fieldValid = false;
        }
    } else {
        if(inputValue.length > 10 && inputValue.length < 1501 && messageCheck.test(inputValue)) {
            fieldValid = true;
        } else {
            fieldValid = false;
        }
    }

    return fieldValid;
 }

 function createError(i, target) {
    const errorSpanChild = 4;
    const inputField = 1;
    let allFields = target.parentNode.parentNode.getElementsByClassName("form__group");
    
    //check if field is empty, if so set empty field error
    //otherwise set a different error
    if(allFields[i].childNodes[inputField].value.length < 1) {
        allFields[i].childNodes[errorSpanChild].innerHTML = "This field cannot be empty";
    } else {
        //check which field then set appropriate error
        if(i == 0) {
            allFields[i].childNodes[errorSpanChild].innerHTML = "Cannot contain special characters or numbers";
        } else if (i == 1) {
            allFields[i].childNodes[errorSpanChild].innerHTML = "Must be a valid email";
        } else {
            allFields[i].childNodes[errorSpanChild].innerHTML = "Cannot contain special characters and must be over 10 characters";
        }
    }

    //at the end append the error class to the error element
    allFields[i].childNodes[errorSpanChild].classList.add("form__error--visible");
 }

 function removeError(i, target) {
    const errorSpanChild = 4;
    let allFields = target.parentNode.parentNode.getElementsByClassName("form__group");

    allFields[i].childNodes[errorSpanChild].innerHTML = "";
    if(allFields[i].childNodes[errorSpanChild].classList.item(1)) {
        allFields[i].childNodes[errorSpanChild].classList.remove("form__error--visible");
    }
 }


//on pageload create eventlisteners 
if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}