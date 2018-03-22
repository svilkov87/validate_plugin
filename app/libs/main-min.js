'use strict';

var form       = document.getElementById(validate.formId),
    formAccess = form.elements;

// find plugin's button

for (var i = 0; i < form.length; i++){

    if(form[i].getAttribute('type') == 'button'){

        var button = form[i];

    }

}


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
        }
    }

// defaultStyles  : false
};

var objectArray = [];
// var objectArray = [];

for ( var objectKey in pluginSettings.rules) {

    objectArray.push(objectKey);

}

button.addEventListener( "click" , function(e) {
    event.preventDefault();

    for ( var i = 0; i < formAccess.length; i++ ) {

        if( formAccess[i].getAttribute('type') == 'text' ){

            // find plugin's inputs
            var inputs   = formAccess[i],
                inputsId = inputs.getAttribute('id'),
                input    = document.getElementById(inputsId);

            for (var j = 0; j < objectArray.length; j++) {

                if (inputsId == objectArray[j]) {

                    // console.log( pluginSettings.rules[inputsId]);

                    if ( pluginSettings.rules[inputsId].required === true ) {

                        if ( !input.value ) {
                            input.value = pluginSettings.rules[inputsId].messageRequired;
                        }
                        else if ( input.value.length < pluginSettings.rules[inputsId].minLength ) {

                            input.value = pluginSettings.rules[inputsId].messageLength;

                        }
                        else if ( pluginSettings.rules[inputsId].matched ) {

                            var matched = document.getElementById(pluginSettings.rules[inputsId].matched);

                            if ( matched.value != input.value) {

                                input.value = pluginSettings.rules[inputsId].messageMatch;

                            }

                        }
                        else if ( pluginSettings.rules[inputsId].exist ) {

                            var existedArr   = pluginSettings.rules[inputsId].exist,
                                existedValue = input.value;

                                // console.log( existedValue );
                                console.log( pluginSettings.rules[inputsId].exist );

                            if (!existedArr.some(existedArr => existedValue.includes(existedArr)) ) {

                                input.value = pluginSettings.rules[inputsId].messageExist;

                            }

                        }

                    }

                }

            }

        }

    }


    // for (var i = 0; i < formAccess.length; i++) {

    //     if( formAccess[i].getAttribute('type') == 'text' ){

            // if (!formAccess[i].value) {

            //     var parent  = formAccess[i].parentNode,
            //     messageElem = document.createElement('span');

            //     messageElem.className = "b-form__error";
            //     parent.insertBefore(messageElem, formAccess[i]);

            //     formAccess[i].classList.add('error_border');

            // }

            // messageElem.innerHTML = errorMessages.data[key];

            // var inputId = formAccess[i].getAttribute('id');
                // console.log(inputId);

            // for ( var rulesKey in pluginSettings.rules) {

            //     var arr = [];

            //     var matchedIdInput = document.getElementById(rulesKey);

            // // если в rules есть true,

            //     if ( pluginSettings.rules[rulesKey].required === true ) {

            //         if (!matchedIdInput.value) {

            //             showError(matchedIdInput, pluginSettings.rules[rulesKey].messageRequired);
            //         }

            //         if (pluginSettings.rules[rulesKey].minLength) {

            //             console.log('key exist');

            //             if ( matchedIdInput.value.length < pluginSettings.rules[rulesKey].minLength ) {


            //                 showError(matchedIdInput, pluginSettings.rules[rulesKey].messageLength);


            //             }

            //         }

            //     }

            // }

    //     }

    // }

} );

createElements( formAccess );

//create inputs function

function createElements ( elem ) {

    for(var i = 0; i < elem.length; i++){

        if( elem[i].getAttribute('type') == 'text' ){

            var wrapper        = document.createElement('div'),
            dataLabelattribute = elem[i].getAttribute('data-label'),
            inputId            = elem[i].getAttribute('id'),
            label              = document.createElement('label');

        // if you want to use plugin's styles
            if(validate.defaultStyles === undefined || validate.defaultStyles === true) {

                form.className    = "b-form";
                wrapper.className = "b-form__block";
                label.className   = 'b-form__label';
                elem[i].className = 'b-form__input';

            }

            wrapper.innerHTML = elem[i].outerHTML;
            elem[i].parentNode.replaceChild(wrapper,elem[i]);

            var parent  = elem[i].parentNode;
            parent.insertBefore(label, elem[i]);
            label.innerHTML = dataLabelattribute;
            label.setAttribute('for', inputId);

        }   else if ( elem[i].getAttribute('type') == 'button') {

            // if you want to use plugin's styles
            if(validate.defaultStyles === undefined || validate.defaultStyles === true) {

            elem[i].className = 'b-form__button';

            }

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

