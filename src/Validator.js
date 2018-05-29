import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {exceededMaxLength, lessThanMinValue, message, moreThanMaxValue, notEnoughLength} from 'messages';


/** Validate takes array of field, value and property and validate values against the properties
 *  for eg.
 *  array = {
 *           field1 :[value1, property1, property2],
 *           field2:[value2,property1,property2,property3]
 *          }
 *  @param array =>array as described above
 *  @return {object,boolean}=>{(key,error),true/false}. IF there error field is empty, isValid will be true ELSE false
 *  */
export function validate(array) {
    const errors = {};
    Object.keys(array).forEach(function (field) {
        const value = array[field][0] + '';

        //adding '' after array[field][0] will make it a string. npm Validator only validates string
        array[field].shift();
        array[field].every(property => {
            const error = getValidationForProperty(value, property);
            if (error !== undefined) {
                errors[field] = error;
                return false
            }
            return true
        });
    });
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

/** eval is converting string into function call
 * @param value => value, which has to be validated
 * @param property => property against which value will be validated
 * @return string => error msg from helper functions
 * */
function getValidationForProperty(value, property) {
    if (property.indexOf('(') > -1) {

        /*
        * for eg. property = someFunction(arg1)
        * it will be converted into someFunction(arg1,value)
        **/
        const functionWithArgument = property.replace(')', ',' + '\'' + value + '\'' + ')');
        return eval(functionWithArgument);
    }
    // console.log(`${property}('${value}')`);
    // console.log(property + '(' + '\'' + value + '\'' + ')');
    //coverts it into eval('property(value)') which is equivalent of calling property function
    // return eval(property + '(' + '\'' + value + '\'' + ')');
    return eval(`${property}('${value}')`);

}

function isRequired(value) {
    if (Validator.isNull(value)) {
        return message.required;
    }
}

function max(maxLength, value) {
    if (!Validator.isLength(value, 0, maxLength)) {
        return exceededMaxLength(maxLength);
    }
}

function min(minLength, value) {
    if (!Validator.isLength(value, minLength, 100)) {
        return notEnoughLength(minLength);
    }
}

function isEmail(value) {
    if (!Validator.isEmail(value)) {
        return message.invalidEmail;
    }
}

function isAlpha(value) {
    if (!Validator.isNull(value)) {
        if (!Validator.isAlpha(value)) {
            return message.notAlpha;
        }
    }
}

function isAlphanumeric(value) {
    if (!Validator.isNull(value)) {
        if (!Validator.isAlphanumeric(value)) {
            return message.notAlphanumeric;
        }
    }
}

function isNumber(value) {
    if (!Validator.isNull(value)) {
        if (!Validator.isInt(value)) {
            return message.notNumber;
        }
    }
}

/** validates integer. (minimum value by default is -1000000)
 * @param maxVal => maximum value allowed for value
 * @param value => input value
 */
function maxValue(maxVal,value) {
    if (!Validator.isNull(value)) {
        if (!(value <= maxVal)) {
            return moreThanMaxValue(maxVal);
        }
    }
}

/** validates integer.(maximum value by default is 1000000)
 * @param minVal => minimum value allowed for value
 * @param value => input value
 */
function minValue(minVal,value) {
    const stringValue = `${value}`;
    if (!Validator.isNull(stringValue)) {
        if (!(value >= minVal)) {
            return lessThanMinValue(minVal);
        }
    }
}

function passwordMatch(password, passwordConfirm) {
    if (!Validator.equals(password, passwordConfirm)) {
        return message.passwordNotMatch;
    }
}


function shouldNotMatch(oldPassword, newPassword) {
    if (Validator.equals(oldPassword, newPassword)) {
        return message.passwordIsSame;
    }
}

function isDate(value) {
    if (!Validator.isISO8601(value)) {
        return message.invalidDate;
    }
}

/**
 * @param Boolean isMobileValid     It is sent by the state. So if it is false it returns the error message
 * @param Any     value             Not required but it is better to just write it in the function rather than recreating a logic
 * @return string                   Validation message
 * */
function isMobile(isMobileValid, value) {
    if (isMobileValid !== 'true') {
        return message.invalidMobile;
    }
}

function isValidRepObjectLength(sets, RepObjectLength) {
    if (!isEmpty(sets)) {
        if (!Validator.equals(RepObjectLength, sets)) {
            return message.required;
        }
    }
}