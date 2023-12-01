// L'endroit où placer le code du front-end.
window.addEventListener("load", function () {
    const nameInput = document.getElementById("nom");
    const especeInput = document.getElementById("espece");
    const raceInput = document.getElementById("race");
    const ageInput = document.getElementById("age");
    const descriptionInput = document.getElementById("description");
    const courrielInput = document.getElementById("courriel");
    const adresseInput = document.getElementById("adresse");
    const villeInput = document.getElementById("ville");
    const codePostalInput = document.getElementById("cp");

    const nameError = document.getElementById("name-error");
    const especeError = document.getElementById("espece-error");
    const raceError = document.getElementById("race-error");
    const ageError = document.getElementById("age-error");
    const descriptionError = document.getElementById("description-error");
    const courrielError = document.getElementById("courriel-error");
    const adresseError = document.getElementById("adresse-error");
    const villeError = document.getElementById("ville-error");
    const codePostalError = document.getElementById("cp-error");

    const submitButton = document.getElementById("submit-button");


    //******************************************
    //**            EVENT LISTENERS           **
    //******************************************

    // CHECK NAME    done
    nameInput.addEventListener('change', function() {
        let validation = validateName(nameInput.value);
        if (validation === false) {
            displayErrorMessage("Le nom de l'animal doit avoir entre 3 et 20 caractères sans virgule.", nameError);
        } else {
            clearErrorMessage(nameError);
        }
        checkAllFields();

    });

    function validateName(nameInput) {
        let regexString = /[^a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-.'']/;
        if (regexString.test(nameInput)) {
            return false;
        }
        else if (nameInput.length < 3 || nameInput.length > 20) {
            return false;
        }
        return true;
    }

    // CHECK ESPECE
    especeInput.addEventListener('change', function() {
        let validation = validateEspece(especeInput.value);
        if (validation === false) {
            displayErrorMessage("L'entrée est invalide", especeError);
        } else {
            clearErrorMessage(especeError);
        }
        checkAllFields();

    });

    function validateEspece(especeInput) {
        let regexString = /[^a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-'']/;
        if (regexString.test(especeInput)) {
            return false;
        }
        return true;
    }

    //CHECK RACE
    
    raceInput.addEventListener('change', function() {
        let validation = validateRace(raceInput.value);
        if (validation === false) {
            displayErrorMessage("L'entrée est invalide", raceError);
        } else {
            clearErrorMessage(raceError);
        }

        checkAllFields();
    });

    function validateRace(raceInput) {
        let regexString = /[^a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-'']/;
        if (regexString.test(raceInput)) {
            return false;
        }
        return true;
    }


    //CHECK AGE 
    ageInput.addEventListener('change', function() {
        let validation = validateAge(ageInput.value);
        if (validation === false) {
            displayErrorMessage("L'entree de l'age doit etre un chiffre entre 0 et 30.", ageError); 
        } else {
            clearErrorMessage(ageError);
        }
        checkAllFields();

    });

    function validateAge(ageInput) {
        if (isNaN(ageInput)||ageInput.includes(".")) {
            return false;
        }
        else if(ageInput< 0 || ageInput > 30){
            return false;
        }
        return true;
    }

    //CHECK DESCRIPTION
    descriptionInput.addEventListener('change', function() {
        let validation = validateDescription(descriptionInput.value);
        if (validation === false) {
            displayErrorMessage("La description est invalide.", descriptionError);
        } else {
            clearErrorMessage(descriptionError);
        }
        checkAllFields();

    });

    function validateDescription(descriptionInput) {
        if (descriptionInput === "") {
            return false;
        }
        return true;
    }

    //CHECK COURRIEL

    courrielInput.addEventListener('change', function() {
        let validation = validateCourriel(courrielInput.value);
        if (validation === false) {
            displayErrorMessage("L'entree est invalide", courrielError); 
        } else {
            clearErrorMessage(courrielError);
        }
        checkAllFields();

    });

    function validateCourriel(courrielInput) {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(courrielInput)) {
            return true;
        }
        return false;
    }

    //CHECK ADRESSE 
    adresseInput.addEventListener('change', function() {
        let validation = validateAdresse(adresseInput.value);
        if (validation === false) {
            displayErrorMessage("L'entree est invalide", adresseError); 
        } else {
            clearErrorMessage(adresseError);
        }
        checkAllFields();

    });

    function validateAdresse(adresseInput) {
        let regexAdresse = /^\d+\s+[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-]+$/;
        return regexAdresse.test(adresseInput);

    }

    //CHECK VILLE
        villeInput.addEventListener('change', function() { //input for debug'
            let validation = validateVille(villeInput.value);
            if (validation === false) {
                displayErrorMessage("L'entree est invalide", villeError); 
            } else {
                clearErrorMessage(villeError);
            }
            checkAllFields();

        });

        function validateVille(villeInput) {
            let villeRegex = /[^a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-'']/;
            if (villeRegex.test(villeInput)) {//regex to get only letters (including accented ones) no ',' or numbers, etc
                return false;
            }
            return true;
        }

    //CHECK CODE POSTAL
    codePostalInput.addEventListener('change', function() {
        let validation = validateCodePostal(codePostalInput.value);
        if (validation === false) {
            displayErrorMessage("L'entree est invalide", codePostalError); 
        } else {
            clearErrorMessage(codePostalError);
        }
        checkAllFields();

    });

    function validateCodePostal(codePostalInput) {
        let myRegex = new RegExp("^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$"); //regex for postal code
        if(myRegex.test(codePostalInput)){
            return true;
        }
        return false;
    }

    //******************************************
    //**           IF EMPTY FIELDS            **
    //******************************************

    //CHECK NOM VIDE
    const inputsName = [especeInput, raceInput, ageInput, descriptionInput, courrielInput, adresseInput, villeInput, codePostalInput, submitButton];

    inputsName.forEach(input => {
        input.addEventListener('focus', function() {
        emptyOnClick(nameInput, "Ce champs est vide.", nameError);
        });
    });

    //CHECK ESPECE VIDE

    const inputsEspece = [raceInput, ageInput, descriptionInput, courrielInput, adresseInput, villeInput, codePostalInput, submitButton];

    inputsEspece.forEach(input => {
        input.addEventListener('focus', function() {
            emptyOnClick(especeInput, "Ce champs est vide.", especeError);
        });
    });


    //CHECK RACE VIDE

    const inputsRace = [ageInput, descriptionInput, courrielInput, adresseInput, villeInput, codePostalInput, submitButton];

    inputsRace.forEach(input => {
        input.addEventListener('focus', function() {
            emptyOnClick(raceInput, "Ce champs est vide.", raceError);
        });
    });

    //CHECK AGE VIDE
    const inputsAge = [descriptionInput, courrielInput, adresseInput, villeInput, codePostalInput, submitButton];

    inputsAge.forEach(input => {
        input.addEventListener('focus', function() {
            emptyOnClick(ageInput, "Ce champs est vide.", ageError);
        });
    });  

    // CHECK DESCRIPTION VIDE
    const inputsDescription = [courrielInput, adresseInput, villeInput, codePostalInput, submitButton];

    inputsDescription.forEach(input => {
        input.addEventListener('focus', function() {
            emptyOnClick(descriptionInput, "Ce champs est vide.", descriptionError);
        });
    });  

    //CHECK COURRIEL VIDE
    const inputsCourriel = [adresseInput, villeInput, codePostalInput, submitButton];

    inputsCourriel.forEach(input => {
        input.addEventListener('focus', function() {
            emptyOnClick(courrielInput, "Ce champs est vide.", courrielError);
        });
    });  

    //CHECK ADRESSE VIDE
    const inputsAdresse = [villeInput, codePostalInput, submitButton];

    inputsAdresse.forEach(input => {
        input.addEventListener('focus', function() {
            emptyOnClick(adresseInput, "Ce champs est vide.", adresseError);
        });
    });  

    //CHECK VILLE VIDE
    const inputsVille= [codePostalInput, submitButton];
    inputsVille.forEach(input => {
        input.addEventListener('focus', function() {
            emptyOnClick(villeInput, "Ce champs est vide.", villeError);
        });
    });

    //CHECK CODE POSTAL VIDE
    const inputsCodePostal = [submitButton];
    inputsCodePostal.forEach(input => {
        input.addEventListener('focus', function() {
            emptyOnClick(codePostalInput, "Ce champs est vide.", codePostalError);
        });
    });

    function checkAllFields() {
        let allFields = [
            validateName(nameInput.value),
            validateEspece(especeInput.value),
            validateRace(raceInput.value),
            validateAge(ageInput.value),
            validateDescription(descriptionInput.value),
            validateCourriel(courrielInput.value),
            validateAdresse(adresseInput.value),
            validateVille(villeInput.value),
            validateCodePostal(codePostalInput.value)
        ];
    
        // If all fields are valid, enable the submit button
        if (allFields.every(field => field === true)) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    function emptyOnClick(input, errorMessage, errorElement) {
        const inputValue = input.value.trim();
        if (inputValue === "") {
            displayErrorMessage(errorMessage, errorElement);
            submitButton.disabled = true;
        } else {
            clearErrorMessage(errorElement);
            checkAllFields(); // Call the checkAllFields function here
        }
    }
    
    });

//******************************************
//**       FUNCTION OF EXECUTIONS         **
//******************************************

function displayErrorMessage(message, errorElement) {
    errorElement.textContent = message;
}

function clearErrorMessage(errorElement) {
    errorElement.textContent = "";
}