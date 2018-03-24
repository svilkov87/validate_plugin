'use strict';

// создать стили формы плагина или кастомные
// сообщения об ошибках выводить в диве, в котором будет label

var pluginSettings = {
    formId : 'b-form',
    rules  : {
        'login' : {
            required  : true,
            messageRequired : 'Login is not required-plugin',
            messageLength   : 'Login must be more 4 symbols-plugin',
            // required  : false,
            minLength : 4
        },
        'password' : {
            minLength : 8,
            required  : true,
            matched   : 'repeat-password',
            messageRequired : 'Password is not required-plugin',
            messageLength   : 'Password must be more 8 symbols-plugin',
            messageMatch    : 'Passwords is not match-plugin'
        },
        'e-mail' : {
            minLength : 8,
            required  : true,
            messageRequired : 'Email is not required-plugin',
            messageLength   : 'Email must be more 8 symbols-plugin',
            messageExist    : 'Email must contain @, .com, .ru symbols-plugin',
            exist     : ['@','.ru','.com']
        },
        'message' : {
            minLength : 10,
            required  : false
        }
    }
    // defaultStyles : false
};

var form       = document.getElementById(pluginSettings.formId),
    printBlock = document.getElementById('printBlock'),
    // textareatest = document.getElementById('textareatest'),
    formAccess = form.elements;

// find plugin's button

for (var i = 0; i < form.length; i++){

    if(form[i].getAttribute('type') == 'button'){

        var button = form[i];

    }
    else if ( form[i].tagName == 'TEXTAREA' ) {

        var textarea = form[i];

    }

}

var objectArray = [];

for ( var objectKey in pluginSettings.rules) {

    objectArray.push(objectKey);

}

            textarea.addEventListener('keyup', function(){

                console.log(this.value);

            } );

button.addEventListener( "click" , function(e) {
    event.preventDefault();

    for ( var i = 0; i < formAccess.length; i++ ) {

        console.log(formAccess[i].value);

        // if ( !formAccess[i].value ) { // обязательное условие

            if( formAccess[i].getAttribute('type') == 'text' || formAccess[i].getAttribute('type') == 'password' ){

                // find plugin's inputs
                var inputs     = formAccess[i],
                    inputsName = inputs.getAttribute('name'),
                    input      = document.getElementById(inputsName);

                for (var j = 0; j < objectArray.length; j++) {

                    if (inputsName == objectArray[j]) {

                        if ( pluginSettings.rules[inputsName].required === true ) {

                            if ( !input.value ) {
                                input.value = pluginSettings.rules[inputsName].messageRequired;
                            }
                            else if ( input.value.length < pluginSettings.rules[inputsName].minLength ) {

                                input.value = pluginSettings.rules[inputsName].messageLength;

                            }
                            else if ( pluginSettings.rules[inputsName].matched ) {

                                var matched = document.getElementById(pluginSettings.rules[inputsName].matched);


                                if ( matched.value != input.value) {

                                    input.value = pluginSettings.rules[inputsName].messageMatch;

                                }

                            }
                            else if ( pluginSettings.rules[inputsName].exist ) {

                                var existedArr   = pluginSettings.rules[inputsName].exist,
                                    existedValue = input.value;

                                if (!existedArr.some(existedArr => existedValue.includes(existedArr)) ) {

                                    input.value = pluginSettings.rules[inputsName].messageExist;

                                }

                            }

                        }

                    }

                }

            }
            else if ( formAccess[i].tagName == 'TEXTAREA' ) {

                var inputs     = formAccess[i],
                    inputsName = inputs.getAttribute('name');
                    // input      = document.getElementById(inputsName);

                    console.log(inputsName);

                for (var j = 0; j < objectArray.length; j++) {

                    if (inputsName == objectArray[j]) {

                        if ( pluginSettings.rules[inputsName].required === true ) {

                            if ( !input.value ) {
                                input.value = pluginSettings.rules[inputsName].messageRequired;
                            }
                            else if ( input.value.length < pluginSettings.rules[inputsName].minLength ) {

                                input.value = pluginSettings.rules[inputsName].messageLength;

                            }
                            else if ( pluginSettings.rules[inputsName].matched ) {

                                var matched = document.getElementById(pluginSettings.rules[inputsName].matched);


                                if ( matched.value != input.value) {

                                    input.value = pluginSettings.rules[inputsName].messageMatch;

                                }

                            }
                            else if ( pluginSettings.rules[inputsName].exist ) {

                                var existedArr   = pluginSettings.rules[inputsName].exist,
                                    existedValue = input.value;

                                if (!existedArr.some(existedArr => existedValue.includes(existedArr)) ) {

                                    input.value = pluginSettings.rules[inputsName].messageExist;

                                }

                            }

                        }

                    }

                }

            }

        // }

    }

} );

settings( formAccess );

// create inputs, wrappers, lebels function

function settings ( elem ) {

    for(var i = 0; i < elem.length; i++){

        if( elem[i].getAttribute('type') == 'text' || elem[i].getAttribute('type') == 'password' ){

            // if you want to use plugin's styles
            if(pluginSettings.defaultStyles === undefined || pluginSettings.defaultStyles === true) {

                var dataLabelattribute = elem[i].getAttribute('data-label'),
                    wrapperLabel       = document.createElement('div'),
                    inputId            = elem[i].getAttribute('id'),
                    label              = document.createElement('label');

                wrapperLabel.className = "b-form__wrapper-label";
                label.className   = 'b-form__label';
                elem[i].className = 'b-form__input';

                elem[i].outerHTML = '<div class="b-form__block">' + elem[i].outerHTML + '</div>';

                // var parent  = elem[i].parentNode;
                // parent.insertBefore(label, elem[i]);

                var parent  = elem[i].parentNode;
                parent.insertBefore(wrapperLabel, elem[i]);
                wrapperLabel.appendChild(label);
                label.innerHTML = dataLabelattribute;
                label.setAttribute('for', inputId);

                form.className    = "b-form";
                label.className   = 'b-form__label';
                elem[i].className = 'b-form__input';

            }

        }
        else if ( elem[i].getAttribute('type') == 'button') {

            // if you want to use plugin's styles
            if(pluginSettings.defaultStyles === undefined || pluginSettings.defaultStyles === true) {

                elem[i].className = 'b-form__button';

            }
        }
        else if ( elem[i].tagName == 'TEXTAREA' ) {

            // if you want to use plugin's styles
            if(pluginSettings.defaultStyles === undefined || pluginSettings.defaultStyles === true) {

                // var wrapperTextArea    = document.createElement('div'),
                var dataLabelattribute = elem[i].getAttribute('data-label'),
                    inputId            = elem[i].getAttribute('id'),
                    wrapperLabel       = document.createElement('div'),
                    label              = document.createElement('label');

                wrapperLabel.className = "b-form__wrapper-label";
                label.className   = 'b-form__label';
                elem[i].className = 'b-form__input';

                elem[i].outerHTML = '<div class="b-form__block">' + elem[i].outerHTML + '</div>';

                var parent  = elem[i].parentNode;
                parent.insertBefore(wrapperLabel, elem[i]);
                wrapperLabel.appendChild(label);
                label.innerHTML = dataLabelattribute;
                label.setAttribute('for', inputId);

            }

            for ( var key in pluginSettings.rules ) {

                // console.log(key);

            }
            //     if ( elem[i] == key ) {

                    elem[i].addEventListener('keyup', function(){

                        // console.log(this.value);

                    } );
            //     }
            // }

        }

    }

}

// settings
function createError ( element, message ) {

  if(!element.value) {

        var parent  = element.parentNode,
        messageElem = document.createElement('span');

        messageElem.className = "b-form__error";
        parent.insertBefore(messageElem, element);

        element.classList.add('error_border');

        messageElem.innerHTML = message;

    }

}

function showError(input, message) {

  var parent      = input.parentNode,
      messageElem = document.createElement('span');

  messageElem.className = "b-form__error";
  parent.insertBefore(messageElem, input);

  input.classList.add('error_border');

  messageElem.innerHTML = message;

}

