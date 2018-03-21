'use strict';

var form       = document.getElementById(validate.formId),
    formAccess = form.elements;

// plugin's object

var pluginSettings = ({
    formId : 'b-form',
    messages : {
        'login' : {
            messageRequired : 'Login is not required-plugin',
            messageLength   : 'Login must be more 4 symbols-plugin'
        },
        'password' : {
            messageRequired : 'Password is not required-plugin',
            messageLength   : 'Password must be more 8 symbols-plugin',
            messageMatch    : 'Passwords is not match-plugin'
        },
        'e-mail' : {
            messageRequired : 'Email is not required-plugin',
            messageLength   : 'Email must be more 8 symbols-plugin',
            messageMatch    : 'Email must contain @, .com, .ru symbols-plugin'
        }
    },
    rules : {
        'login' : {
            required  : true,
            minLength : 4
        },
        'password' : {
            minLength : 8,
            required  : true,
            matched   : 'repeat-password'
        },
        'e-mail' : {
            minLength : 8,
            required  : true,
            exist     : ['@','.ru','.com']
        }
    }
// defaultStyles  : false
});

// for ( var key in pluginSettings.messages) {

//     console.log(key);

//     // if (key === 'messages') {

//     // console.log(key);

//     // }

// }


//find button

for (var i = 0; i < form.length; i++){

  if(form[i].getAttribute('type') == 'button'){

    var button = form[i];

  }

}

button.addEventListener( "click" , function(e) {
    event.preventDefault();

    for (var i = 0; i < formAccess.length; i++) {

        if( formAccess[i].getAttribute('type') == 'text' ){

            if (!formAccess[i].value) {

                var parent  = formAccess[i].parentNode,
                messageElem = document.createElement('span');

                messageElem.className = "b-form__error";
                parent.insertBefore(messageElem, formAccess[i]);

                formAccess[i].classList.add('error_border');

            // messageElem.innerHTML = errorMessages.data[key];

            var inputId = formAccess[i].getAttribute('id');

            for ( var key in pluginSettings.messages) {

                var arr = [];

                        for ( var j in pluginSettings.messages[key]) { // !!! верный вариант

                            arr.push(pluginSettings.messages[key][j]);

                        } // !!! верный вариант

                        if (key === inputId) {

                            messageElem.innerHTML = arr;
                            console.log(arr);

                        }

                    }

                }

            }

        }



    // for (var i = 0; i < formAccess.length; i++) {

    //     if( formAccess[i].getAttribute('type') == 'text' ){

    //         if (!formAccess[i].value) {

    //             var parent  = formAccess[i].parentNode,
    //             messageElem = document.createElement('span');

    //             messageElem.className = "b-form__error";
    //             parent.insertBefore(messageElem, formAccess[i]);

    //             formAccess[i].classList.add('error_border');

    //             // messageElem.innerHTML = errorMessages.data[key];


    //             //


    //             for ( var key in pluginSettings.messages) {

    //                 console.log(pluginSettings.messages[key]);

    //                 for (var j in pluginSettings.messages[key]) {

    //                     var inputId = formAccess[i].getAttribute('id');

    //                     // console.log(pluginSettings.messages[key]);

    //                     if (key === inputId) {

    //                         var messageObject = pluginSettings.messages[key];

    //                         console.log(pluginSettings.messages[key][j]);

    //                         messageElem.innerHTML = pluginSettings.messages[key][j];

    //                     }

    //                 }

    //             }

    //         }

    //     }

    // }

// createElements( formAccess );

} );

createElements( formAccess );

//create inputs function

function createElements ( elem ) {

  for(var i = 0; i < elem.length; i++){

    if( elem[i].getAttribute('type') == 'text' ){

      var wrapper            = document.createElement('div'),
          dataLabelattribute = elem[i].getAttribute('data-label'),
          inputId            = elem[i].getAttribute('id'),
          label              = document.createElement('label');

     // if you want to use plugin's styles
     if(validate.defaultStyles === undefined || validate.defaultStyles === true) {

        form.className          = "b-form";
        wrapper.className       = "b-form__block";
        label.className         = 'b-form__label';
        elem[i].className       = 'b-form__input';

     }

      wrapper.innerHTML = elem[i].outerHTML;
      elem[i].parentNode.replaceChild(wrapper,elem[i]);

      var parent  = elem[i].parentNode;
      parent.insertBefore(label, elem[i]);
      label.innerHTML = dataLabelattribute;
      label.setAttribute('for', inputId);

      // createError(elem[i], 'lalala');



    } else if ( elem[i].getAttribute('type') == 'button') {

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

    var parent      = element.parentNode,
        messageElem = document.createElement('span');

    messageElem.className = "b-form__error";
    parent.insertBefore(messageElem, element);

    element.classList.add('error_border');

    messageElem.innerHTML = message;

  }

}

