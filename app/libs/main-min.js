'use strict';

var form       = document.getElementById(pluginSettings.formId),
    formAccess = form.elements;

// find plugin's button

for (var i = 0; i < form.length; i++){

    if(form[i].getAttribute('type') == 'submit'){

        var button = form[i];

    }

}

var objectArray = [];

for ( var objectKey in pluginSettings.rules) {

    objectArray.push(objectKey);

}

var count = 0;

for (var i = 0; i < formAccess.length; i++) {

    var formElements = formAccess[i];
        // inputsName = formElements.getAttribute('name'),
        // input      = document.getElementById(inputsName);

    formElements.addEventListener('keyup', function(){

        var inputsName = this.getAttribute('name'),
        input      = document.getElementById(inputsName);

        // console.log( this.getAttribute('type') );
        console.log( inputsName );

        deleteSpanError( formAccess );

        if( this.getAttribute('type') == 'text' || this.getAttribute('type') == 'password' ){

            count + 1;


            for (var j = 0; j < objectArray.length; j++) {

                if (inputsName == objectArray[j]) {

                    if ( pluginSettings.rules[inputsName].required ) {

                        if ( !this.value ) {

                            showErrors ( this, pluginSettings.rules[inputsName].messageRequired );

                        }

                        else if ( this.value.length < pluginSettings.rules[inputsName].minLength ) {

                            showErrors ( this, pluginSettings.rules[inputsName].messageLength );

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

// button.addEventListener( "click" , function(e) {

//     e.preventDefault();

//     deleteSpanError( formAccess );

//     for ( var i = 0; i < formAccess.length; i++ ) {

//         if( formAccess[i].getAttribute('type') == 'text' || formAccess[i].getAttribute('type') == 'password' ){

//             // find plugin's inputs
//             var inputs     = formAccess[i],
//                 inputsName = inputs.getAttribute('name'),
//                 input      = document.getElementById(inputsName);

//             for (var j = 0; j < objectArray.length; j++) {

//                 if (inputsName == objectArray[j]) {

//                     if ( pluginSettings.rules[inputsName].required === true ) {

//                         if ( !input.value ) {

//                             e.preventDefault();

//                             showErrors ( inputs, pluginSettings.rules[inputsName].messageRequired );

//                         }
//                         else if ( input.value.length < pluginSettings.rules[inputsName].minLength ) {

//                             e.preventDefault();

//                             showErrors ( inputs, pluginSettings.rules[inputsName].messageLength );

//                         }
//                         else if ( pluginSettings.rules[inputsName].matched ) {

//                             var matched = document.getElementById(pluginSettings.rules[inputsName].matched);


//                             if ( matched.value != input.value) {

//                                 e.preventDefault();

//                                 showErrors ( inputs, pluginSettings.rules[inputsName].messageMatch );

//                             }

//                         }
//                         else if ( pluginSettings.rules[inputsName].exist ) {

//                             var existedArr   = pluginSettings.rules[inputsName].exist,
//                                 existedValue = input.value;

//                             if (!existedArr.some(existedArr => existedValue.includes(existedArr)) ) {
//                                 e.preventDefault();

//                                 showErrors ( inputs, pluginSettings.rules[inputsName].messageExist );

//                             }

//                         }

//                     }

//                 }

//             }

//         }
//         // else if ( formAccess[i].tagName == 'TEXTAREA' ) {

//         //     var inputs     = formAccess[i],
//         //         inputsName = inputs.getAttribute('name');
//         //         // input      = document.getElementById(inputsName);


//         //     // for (var j = 0; j < objectArray.length; j++) {

//         //     //     if (inputsName == objectArray[j]) {

//         //     //         if ( pluginSettings.rules[inputsName].required === true ) {

//         //     //             if ( !input.value ) {
//         //     //                 input.value = pluginSettings.rules[inputsName].messageRequired;
//         //     //             }
//         //     //             else if ( input.value.length < pluginSettings.rules[inputsName].minLength ) {

//         //     //                 input.value = pluginSettings.rules[inputsName].messageLength;

//         //     //             }
//         //     //             else if ( pluginSettings.rules[inputsName].matched ) {

//         //     //                 var matched = document.getElementById(pluginSettings.rules[inputsName].matched);


//         //     //                 if ( matched.value != input.value) {

//         //     //                     input.value = pluginSettings.rules[inputsName].messageMatch;

//         //     //                 }

//         //     //             }
//         //     //             else if ( pluginSettings.rules[inputsName].exist ) {

//         //     //                 var existedArr   = pluginSettings.rules[inputsName].exist,
//         //     //                     existedValue = input.value;

//         //     //                 if (!existedArr.some(existedArr => existedValue.includes(existedArr)) ) {

//         //     //                     input.value = pluginSettings.rules[inputsName].messageExist;

//         //     //                 }

//         //     //             }

//         //     //         }

//         //     //     }

//         //     // }

//         // }

//     }

// } );

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

                // elem[i].outerHTML = '<div class="b-form__block">' + elem[i].outerHTML + '</div>';

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
        else if ( elem[i].getAttribute('type') == 'submit') {

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

                // elem[i].outerHTML = '<div class="b-form__block">' + elem[i].outerHTML + '</div>';

                var parent  = elem[i].parentNode;
                parent.insertBefore(wrapperLabel, elem[i]);
                wrapperLabel.appendChild(label);
                label.innerHTML = dataLabelattribute;
                label.setAttribute('for', inputId);

            }

        }

    }

}

function showErrors ( inputs, message ) {

    var errorSpan    = document.createElement('span'),
        dataEffect   = inputs.getAttribute('data-effect').split(" "),
        labelWrapper  = inputs.previousSibling;

    inputs.classList.add("error_border");
    labelWrapper.classList.add(dataEffect[dataEffect.length - 1]);

    errorSpan.className = "b-form__error-span " + dataEffect[dataEffect.length - 1];

    labelWrapper.appendChild(errorSpan);

    errorSpan.innerHTML = message;

}

function deleteSpanError ( elem ) {

  for (var i = 0; i < elem.length; i++) {

    var labelWrap = elem[i].previousElementSibling,
        dataEffect = elem[i].getAttribute('data-effect'),
        childSpan = labelWrap.querySelectorAll('span');

    for (var j = 0; j < childSpan.length; j++) {

      // if (childSpan[j].className == "b-form__error-span"){
      if (childSpan[j].classList.contains('b-form__error-span')){

        childSpan[j].parentNode.removeChild(childSpan[j]);

      }

    }

  }

}

