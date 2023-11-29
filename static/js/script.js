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
            submitButton.disabled = true;
        } else {
            clearErrorMessage(nameError);
            submitButton.disabled = false;
        }
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
            submitButton.disabled = true;
        } else {
            clearErrorMessage(especeError);
            submitButton.disabled = false;
        }
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
            submitButton.disabled = true;
        } else {
            clearErrorMessage(raceError);
            submitButton.disabled = false;
        }
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
            submitButton.disabled = true;
        } else {
            clearErrorMessage(ageError);
            submitButton.disabled = false;
        }
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

    //CHECK DESCRIPTION no need to code if i keep the empty validations, we will see... ACTUALLY I WILL CODE IT LATER THO
    



    //CHECK COURRIEL

    courrielInput.addEventListener('change', function() {
        let validation = validateCourriel(courrielInput.value);
        if (validation === false) {
            displayErrorMessage("L'entree est invalide", courrielError); 
            submitButton.disabled = true;
        } else {
            clearErrorMessage(courrielError);
            submitButton.disabled = false;
        }
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
            submitButton.disabled = true;
        } else {
            clearErrorMessage(adresseError);
            submitButton.disabled = false;
        }
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
                submitButton.disabled = true;
            } else {
                clearErrorMessage(villeError);
                submitButton.disabled = false;
            }
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
            submitButton.disabled = true;
        } else {
            clearErrorMessage(codePostalError);
            submitButton.disabled = false;
        }
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

    //CHECK DATE DE NAISSANCE VIDE
    const inputsName = [especeInput, raceInput, ageInput, descriptionInput, courrielInput, adresseInput, villeInput, codePostalInput, submitButton];

    inputsName.forEach(input => {
        input.addEventListener('click', function() {
        emptyOnClick(nameInput, "Ce champs est vide.", nameError);
        });
    });

    //CHECK VOITURE VIDE

    const inputsVoiture = [anneeInput, kiloInput, cameraSelect, reclamationSelect, submitButton];

    inputsVoiture.forEach(input => {
        input.addEventListener('click', function() {
            emptyOnClick(voitureInput, "Ce champs est vide.", voitureError);
        });
    });


    //CHECK ANNEE VIDE

    const inputsAnnee = [kiloInput, cameraSelect, reclamationSelect, submitButton];

    inputsAnnee.forEach(input => {
        input.addEventListener('click', function() {
            emptyOnClick(anneeInput, "Ce champs est vide.", anneeError);
        });
    });

    //CHECK KILO VIDE
    const inputsKilo = [cameraSelect, reclamationSelect, submitButton];

    inputsKilo.forEach(input => {
        input.addEventListener('click', function() {
            emptyOnClick(kiloInput, "Ce champs est vide.", kiloError);
        });
    });  

    //CHECK RECLAMATION 1 VIDE
    const inputsRecOne = [twoReclamation, threeReclamation, fourReclamation, submitButton];

    inputsRecOne.forEach(input => {
        input.addEventListener('click', function() {
            emptyOnClick(oneReclamation, "Ce champs est vide.", oneReclamationError);
        });
    });  

    //CHECK RECLAMATION 2 VIDE
    const inputsRecTwo = [threeReclamation, fourReclamation, submitButton];

    inputsRecTwo.forEach(input => {
        input.addEventListener('click', function() {
            emptyOnClick(twoReclamation, "Ce champs est vide.", twoReclamationError);
        });
    });  


    //CHECK RECLAMATION 3 VIDE
    const inputsRecThree = [fourReclamation, submitButton];

    inputsRecThree.forEach(input => {
        input.addEventListener('click', function() {
            emptyOnClick(threeReclamation, "Ce champs est vide.", threeReclamationError);
        });
    });  

    const inputsRecFour= [submitButton];
});



//******************************************
//**         FUNCTION VALIDATIONS         **
//******************************************







//Pour les champs vides, envoyer message d'erreur
function emptyOnClick(input, errorMessage, errorElement) {
    const inputValue = input.value.trim();
    if (inputValue === "") {
        displayErrorMessage(errorMessage, errorElement);
    }
}


    
// VALIDATE RECLAMATION NUMBER CONTENT 1, 2, 3, 4 :
function validateReclamationInput(reclamation, Errormsg){
    let errorMessage = "";
    if (isNaN(reclamation.value)) {
        errorMessage = "La valeur de votre reclamation doit contenir uniquement des chiffres.";
    } else if (Number(reclamation.value) > 35000) {
        errorMessage = "Désolé, nous n'avons aucun produit à offrir pour ce profil de client";
    }

    if (errorMessage) {
        displayErrorMessage(errorMessage, Errormsg);
        return { isValid: false, errorMessage: errorMessage };
    } else {
        clearErrorMessage(Errormsg);
        return { isValid: true, errorMessage: "" };
    }
}


function checkOverload(reclamation1, reclamation2, reclamation3, reclamation4, totalReclamationError){
    let amount1 = Number(reclamation1.value);
    let amount2 = Number(reclamation2.value);
    let amount3 = Number(reclamation3.value);
    let amount4 = Number(reclamation4.value);

    let total = amount1+amount2+amount3+amount4;
    if(total>35000){
        displayErrorMessage("Désolé, nous n'avons aucun produit à offrir pour ce profil de client", totalReclamationError);
        return false
    }
    if(total >25000){
        return 700;
    }
    return 0;
}

//get nbr reclamation reeturn a int
function getNbrReclamation(reclamationNumbers, reclamationSelect){
    if(reclamationSelect.value === "non-reclamation"){
        return 0;
    }
    if(reclamationNumbers.value === "une-reclamation"){
        return 1;
    }
    if(reclamationNumbers.value === "deux-reclamation"){
        return 2;
    }
    if(reclamationNumbers.value === "trois-reclamation"){
        return 3;
    }
    if(reclamationNumbers.value === "quattre-reclamation"){
        return 4;
    }
}

//get rate base
function getbaseRate(genreSelect,naissanceInput,voitureInput){
    myValuedCar = Number(voitureInput.value);
    if (genreSelect.value === "homme" || genreSelect.value === "non-binaire" && isAge(naissanceInput) < 25) {
        return 0.05*myValuedCar //5%
    }
    else if (isAge(naissanceInput) <= 75) {
        return 0.04*myValuedCar; //4%
    }
    return 0.015*myValuedCar; //1.5%
}

//get final rate
function calculateAnnualRate(baseRate, nbrReclamation, kilo, totalReclamations){
    let annualRate = baseRate + (350*nbrReclamation) + (0.02*kilo) + totalReclamations;
    return annualRate;
}

//get monthly rate
function calculateMonthlyRate(annualRate){
    let monthlyRate = annualRate/12;
    return monthlyRate;
}

function resetValues(reclamation1, reclamation2, reclamation3, reclamation4) {
    reclamation1.value = "";
    reclamation2.value = "";
    reclamation3.value = "";
    reclamation4.value = "";
}


//******************************************
//**       FUNCTION OF EXECUTIONS         **
//******************************************



function displayErrorMessage(message, errorElement) {
    errorElement.textContent = message;
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll(".error");
    for (const errorElement of errorElements) {
        errorElement.textContent = "";
    }
}

function clearErrorMessage(errorElement) {
    errorElement.textContent = "";
}
