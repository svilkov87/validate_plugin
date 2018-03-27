'use strict';

var form       = document.getElementById(pluginSettings.formId),
    blocks     = document.getElementsByClassName('b-form__wrapper-label'),
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
var resultObject = {};

for ( var objectKey in pluginSettings.rules) {

    objectArray.push(objectKey);

}

button.addEventListener( "click" , function(e) {
    event.preventDefault();

    deleteSpanError( formAccess );

    for ( var i = 0; i < formAccess.length; i++ ) {

        if( formAccess[i].getAttribute('type') == 'text' || formAccess[i].getAttribute('type') == 'password' ){

            // find plugin's inputs
            var inputs     = formAccess[i],
                inputsName = inputs.getAttribute('name'),
                input      = document.getElementById(inputsName);

            for (var j = 0; j < objectArray.length; j++) {

                if (inputsName == objectArray[j]) {

                    if ( pluginSettings.rules[inputsName].required === true ) {

                        if ( !input.value ) {

                            showErrors ( inputs, pluginSettings.rules[inputsName].messageRequired );
                            // var errorSpan    = document.createElement('span'),
                            // labelWrapper = inputs.previousSibling;

                            // errorSpan.className = "b-form__error-span";

                            // labelWrapper.appendChild(errorSpan);
                            // // input.value = pluginSettings.rules[inputsName].messageRequired;
                            // errorSpan.innerHTML = pluginSettings.rules[inputsName].messageRequired;
                        }
                        else if ( input.value.length < pluginSettings.rules[inputsName].minLength ) {

                            showErrors ( inputs, pluginSettings.rules[inputsName].messageLength );
                            // var errorSpan    = document.createElement('span'),
                            // labelWrapper = inputs.previousSibling;

                            // errorSpan.className = "b-form__error-span";

                            // labelWrapper.appendChild(errorSpan);

                            // // input.value = pluginSettings.rules[inputsName].messageLength;
                            // errorSpan.innerHTML = pluginSettings.rules[inputsName].messageLength;

                        }
                        else if ( pluginSettings.rules[inputsName].matched ) {

                            var matched = document.getElementById(pluginSettings.rules[inputsName].matched);


                            if ( matched.value != input.value) {

                                showErrors ( inputs, pluginSettings.rules[inputsName].messageMatch );

                                // errorSpan.innerHTML = pluginSettings.rules[inputsName].messageMatch;

                                // input.value = pluginSettings.rules[inputsName].messageMatch;

                            }

                        }
                        else if ( pluginSettings.rules[inputsName].exist ) {

                            var existedArr   = pluginSettings.rules[inputsName].exist,
                                existedValue = input.value;

                            if (!existedArr.some(existedArr => existedValue.includes(existedArr)) ) {

                                showErrors ( inputs, pluginSettings.rules[inputsName].messageExist );

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


            // for (var j = 0; j < objectArray.length; j++) {

            //     if (inputsName == objectArray[j]) {

            //         if ( pluginSettings.rules[inputsName].required === true ) {

            //             if ( !input.value ) {
            //                 input.value = pluginSettings.rules[inputsName].messageRequired;
            //             }
            //             else if ( input.value.length < pluginSettings.rules[inputsName].minLength ) {

            //                 input.value = pluginSettings.rules[inputsName].messageLength;

            //             }
            //             else if ( pluginSettings.rules[inputsName].matched ) {

            //                 var matched = document.getElementById(pluginSettings.rules[inputsName].matched);


            //                 if ( matched.value != input.value) {

            //                     input.value = pluginSettings.rules[inputsName].messageMatch;

            //                 }

            //             }
            //             else if ( pluginSettings.rules[inputsName].exist ) {

            //                 var existedArr   = pluginSettings.rules[inputsName].exist,
            //                     existedValue = input.value;

            //                 if (!existedArr.some(existedArr => existedValue.includes(existedArr)) ) {

            //                     input.value = pluginSettings.rules[inputsName].messageExist;

            //                 }

            //             }

            //         }

            //     }

            // }

        }

    }

} );

settings( formAccess );

// create inputs, wrappers, labels and style function

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

            // var count = 0;
            // var limit = 30;

            // elem[i].addEventListener('keyup', function(){

            //     count++;

            //     // for (var valueNumber = 0; valueNumber < Things.length; valueNumber++) {
            //     //     Things[valueNumber]
            //     // }

            //     // console.log(this.value);
            //     console.log(limit - count);

            // } );

        }

    }

}

function showErrors ( inputs, message ) {
    var errorSpan    = document.createElement('span'),
    labelWrapper     = inputs.previousSibling;

    errorSpan.className = "b-form__error-span";

    labelWrapper.appendChild(errorSpan);

    errorSpan.innerHTML = message;
}

function deleteSpanError ( elem ) {

  for (var i = 0; i < elem.length; i++) {

    var labelWrap = elem[i].previousElementSibling,
        childSpan = labelWrap.querySelectorAll('span');

    for (var j = 0; j < childSpan.length; j++) {

      if (childSpan[j].className == "b-form__error-span"){

        childSpan[j].parentNode.removeChild(childSpan[j]);

      }

    }

  }

}

