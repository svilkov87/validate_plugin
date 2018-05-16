'use strict';

var form          = document.getElementById(pluginSettings.formId);
var formAccess    = form.elements;
var objectArray   = [];
var count         = 0;
var countEventArr = [];

for (var i = 0; i < form.length; i++){

    if(form[i].getAttribute('type') == 'submit'){

        var button = form[i];

    }

}

for ( var objectKey in pluginSettings.rules) {

    objectArray.push(objectKey);

}

for ( var i = 0; i < formAccess.length; i++ ) {

    var formElements = formAccess[i];

    formElements.addEventListener( 'keyup', function(e){

        var keyEvent   = window.event;
        var inputsName = this.getAttribute('name');
        var input      = document.getElementById(inputsName);

        // deleteSpanError( this );

        if( this.getAttribute('type') == 'text' || this.getAttribute('type') == 'password' ){

            for ( var j = 0; j < objectArray.length; j++ ) {

                if ( inputsName == objectArray[j] ) {

                    if ( pluginSettings.rules[inputsName].required ) {

                        if ( !this.value ) {

                            showErrors ( this, pluginSettings.rules[inputsName].messageRequired );

                        }

                        // else if ( this.value.length < pluginSettings.rules[inputsName].minLength ) {
                        else if ( this.value.length <= 1 && keyEvent.key != 'Backspace' ) {

                            showErrors ( this, pluginSettings.rules[inputsName].messageLength );

                        }

                        // else if ( this.value.length < pluginSettings.rules[inputsName].minLength && this.value.length == pluginSettings.rules[inputsName].minLength - 1 ) {
                        else if ( this.value.length == pluginSettings.rules[inputsName].minLength ) {

                            deleteSpanError( this );

                        }

                        else if ( this.value.length == pluginSettings.rules[inputsName].minLength - 1 && keyEvent.key == 'Backspace' ) {

                            showErrors ( this, pluginSettings.rules[inputsName].messageLength );

                        }

                        else if ( this.value.length < 1 ) {

                            deleteSpanError( this );

                        }

                        else if ( pluginSettings.rules[inputsName].matched ) {

                            var matched = document.getElementById(pluginSettings.rules[inputsName].matched);

                            if ( matched.value != this.value) {

                                showErrors ( this, pluginSettings.rules[inputsName].messageMatch );

                            }

                        }

                        else if ( pluginSettings.rules[inputsName].exist ) {

                            var existedArr   = pluginSettings.rules[inputsName].exist,
                                existedValue = this.value;

                            if (!existedArr.some(existedArr => existedValue.includes(existedArr)) ) {

                                showErrors ( this, pluginSettings.rules[inputsName].messageExist );

                            }

                        }

                    }

                }

            }

        }


    } );

}

settings( formAccess );

// create inputs, wrappers, labels and style function

function settings ( elem ) {

    for( var i = 0; i < elem.length; i++ ){

        if ( elem[i].getAttribute('type') == 'submit') {

            elem[i].className = 'b-form__button';

        } else {

            var inputsName = elem[i].getAttribute('name');
            var dataLabelattribute = elem[i].getAttribute('data-label');
            var wrapperLabel       = document.createElement('div');
            var inputId            = elem[i].getAttribute('id');
            var label              = document.createElement('label');

            wrapperLabel.className = "b-form__wrapper-label";
            label.className   = 'b-form__label';
            elem[i].className = 'b-form__input';

            var parent  = elem[i].parentNode;
            parent.insertBefore(wrapperLabel, elem[i]);
            wrapperLabel.appendChild(label);
            label.innerHTML = dataLabelattribute;
            label.setAttribute('for', inputId);

            form.className    = "b-form";
            label.className   = 'b-form__label';
            elem[i].className = 'b-form__input';

            for ( var j = 0; j < objectArray.length; j++ ) {

                if ( inputsName == objectArray[j] ) {

                    if ( pluginSettings.rules[inputsName].required ) {

                        for ( var message in pluginSettings.rules[inputsName].messages) {

                            var errorSpan = document.createElement('span');

                            wrapperLabel.appendChild(errorSpan);
                            errorSpan.innerHTML = pluginSettings.rules[inputsName].messages[message];

                        }

                    }

                }

            }

        }

    }

}

function showErrors ( inputs, message ) {

        var errorSpan    = document.createElement('span');
        var dataEffect   = inputs.getAttribute('data-effect').split(" ");
        var labelWrapper = inputs.previousSibling;

        labelWrapper.classList.add(dataEffect[dataEffect.length - 1]);

        errorSpan.className = "b-form__error-span " + dataEffect[dataEffect.length - 1];

        labelWrapper.appendChild(errorSpan);

        errorSpan.innerHTML = message;
    // }

}

function deleteSpanError ( elem ) {

    var labelWrap = elem.previousElementSibling,
        childSpan = labelWrap.querySelectorAll('span');

    for (var j = 0; j < childSpan.length; j++) {

      if (childSpan[j].classList.contains('b-form__error-span')){

        childSpan[j].parentNode.removeChild(childSpan[j]);

      }

    }

}

