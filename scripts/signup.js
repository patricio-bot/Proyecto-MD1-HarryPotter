'use strict';


class Signup {
    constructor() {
        this.nameInput = document.querySelector("#name");
        this.characterInput = document.querySelector("#character");
        this.bookInput = document.querySelector("#book");
        this.emailInput = document.querySelector("#email");
        this.passwordInput = document.getElementById("password");
        this.repeatPasswordInput = document.getElementById("repeat-password");

        this.buttonInput = document.querySelector("#signup-button");
        this.errorsWrapper = document.querySelector(".message-container");

    }



    // gestionar cambios del input "email"
    handleEmailInput = (event) => {
        const email = event.target.value;

        // validar el texto del input email
        validator.validateValidEmail(email);

        const errors = validator.getErrors();

        // si el nombre del email es valido
        if (!errors.invalidEmailError) {
            // comprueba si el email es unico
            validator.validateUniqueEmail(email);
        }

        this.setErrorMessages();

    }

    // gestionar cambios del input "password"
    handlePasswordInput = (event) => {
        const password = event.target.value;
        console.log(event.target.value);
        const passwordRepeat = this.repeatPasswordInput.value;


        // validar el texto del input password
        validator.validatePassword(password);
        validator.validatePasswordRepeat(password, passwordRepeat);

        this.setErrorMessages();
    }

    // gestionar cambios del input "repeat-password"
    handleRepeatPasswordInput = (event) => {
        const passwordRepeat = event.target.value;
        const password = this.passwordInput.value;

        // validar el texto del input password
        // validar el texto del input repeatPassword
        validator.validatePassword(password);
        validator.validatePasswordRepeat(password, passwordRepeat);

        this.setErrorMessages();
    }

    // gestionar el envio de los datos (submit)
    saveData = (event) => {
        // Cuando el evento ocurre, cancelalo y no recargue la pagina
        event.preventDefault();
        // recoger los valores de cada input
        const name = this.nameInput.value;
        const character = this.characterInput.value;
        const book = this.bookInput.value;
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const repeatPassword = this.repeatPasswordInput.value;

        const newUser = new User(name, character, book, email, password);

        // guardar el nuevo usuario en la base de datos ( simulada :D )
        db.saveNewUser(newUser);


        this.showSuccessMessage();
        this.removeMessages();
    }

    // registarar funciones para cada input/campo
    addListeners = () => {
        // escucha para los cambios de texto
        this.emailInput.addEventListener("input", this.handleEmailInput);
        this.passwordInput.addEventListener("input", this.handlePasswordInput);
        this.repeatPasswordInput.addEventListener("input", this.handleRepeatPasswordInput);

        this.buttonInput.addEventListener("click", this.saveData);

    }

    showSuccessMessage = () => {
        // vacia los errores para que no se sumen
        this.errorsWrapper.innerHTML = "";

        const errorsObj = validator.getErrors();
        // convertir el objeto a un array de strings
        const errorsStringsArr = Object.values(errorsObj);

        if (errorsStringsArr.length > 1) {
            return;
        }







        const name = this.nameInput.value;
        const character = this.characterInput.value;
        const book = this.bookInput.value;
        const email = this.emailInput.value;


        var popup = document.querySelector(".popup-wrapper");
        var popupTextName = document.querySelector(".popup-text > p:nth-child(1)");
        var popupTextCharacter = document.querySelector(".popup-text > p:nth-child(2)");
        var popupTextEmail = document.querySelector(".popup-text > p:nth-child(3)");
        var popupTextBook = document.querySelector(".popup-text > p:nth-child(4)");
        var popupTextEnd = document.querySelector('.popup-text > p:nth-child(5)');
        var popupClose = document.querySelector(".popup-close");

        var dataName = `Name: ${name}`;

        var dataCharacter = `Character: ${character}`;
        var dataBook = `Book: ${book}`;
        var dataEmail = `Email: ${email}`;




        popup.style.display = 'block';
        popupTextName.innerHTML = dataName;
        popupTextCharacter.innerHTML = dataCharacter;
        popupTextEmail.innerHTML = dataEmail;
        popupTextBook.innerHTML = dataBook;
        popupTextEnd.innerHTML = `${name}, save the planet, kill yourself`;

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            this.nameInput.value = "";
            this.characterInput.value = "";
            this.bookInput.value = "";
            this.emailInput.value = "";
            this.passwordInput.value = "";
            this.repeatPasswordInput.value = "";
        });

    }

    removeMessages = () => {
        setTimeout(() => {
            this.errorsWrapper.innerHTML = "";
        }, 2000)
    }


    setErrorMessages = () => {
        // vacia los errores para que no se sumen
        this.errorsWrapper.innerHTML = "";

        const errorsObj = validator.getErrors();

        // convertir el objeto a un array de strings
        const errorsStringsArr = Object.values(errorsObj);

        errorsStringsArr.forEach((errorStr) => {
            const errorMessageP = document.createElement('p');
            errorMessageP.innerHTML = errorStr;

            this.errorsWrapper.appendChild(errorMessageP);
        })

    }
}

// crear una nueva instanica del Signup (objeto)
const signup = new Signup();

window.addEventListener("load", signup.addListeners);

let reset = document.querySelector('#reset');


let form = document.querySelector('.form');
reset.addEventListener('click', function borrar() {
    window.location.reload(true);
    form.reset();

});