import NpmValidator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { exceededMaxLength, lessThanMinValue, message, moreThanMaxValue, notEnoughLength } from 'messages';

/**
 * @param Function  handles messages 
 */
export function Validator(getMessage) {

    if (getMessage === undefined) {
        getMessage = function(key) {
            return message[key]
        }
    }

    /** Validate takes array of field, value and property and validate values against the properties
     * 
     *  @param array array           object array with fieldName, value and validation rules
     *                               array = {
     *                                    field1 :[value1, property1, property2],
     *                                    field2:[value2,property1,property2,property3]
     *                                    }
     *  @return {object, boolean}    {(key,error),true/false}. 
     *                               IF there error field is empty, isValid will be true ELSE false
     */
    this.validate = function(array) {
        const errors = {};

        Object.keys(array).forEach(function(field) {
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
        };
    }


    /** eval is converting string into function call
     * @param String|Number value     value, which has to be validated
     * @param String property         property against which value will be validated
     * @return String                 error msg from helper functions
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
        return eval(`${property}('${value}')`);
    }


    function isRequired(value) {
        if (NpmValidator.isEmpty(value)) {
            return getMessage("required");
        }
    }


    function max(maxLength, value) {
        if (!NpmValidator.isLength(value, 0, maxLength)) {
            return getMessage("max_length_exceeded", maxLength);
        }
    }

    function min(minLength, value) {
        if (!NpmValidator.isLength(value, minLength, 100)) {
            return getMessage("not_enough_length", minLength);
        }
    }

    function isEmail(value) {
        if (!NpmValidator.isEmail(value)) {
            return getMessage("invalid_email");
        }
    }

    /**
     * USAGE : write it like a string   in 'isAlpha' or isAlpha(true)
     * @param {string|boolean} strict   if strict is passed as true, it will not allow any space in the string
     * @param {string} value            value input by user
     * */
    function isAlpha(strict = false, value) {
        if (!NpmValidator.isEmpty(value)) {

            //making a copy of value to avoid mutating the original copy
            let valueCopy = value.slice(0)

            //if strict is not true, it is going to trim all spaces and validate it further
            if (strict !== true) {
                valueCopy = valueCopy.replace(/ /g, '')
            }

            //allow space
            if (!NpmValidator.isAlpha(valueCopy)) {
                return getMessage("not_alpha");
            }
        }
    }

    /**
     * USAGE : write it like a string in 'isAlphanumeric' or isAlphanumeric(true)
     * @param {string|boolean} strict           if strict is passed as true, it will not allow any space in the string
     * @param {string} value            value input by user
     * */
    function isAlphanumeric(strict = false, value) {
        if (!NpmValidator.isEmpty(value)) {

            //making a copy of value to avoid mutating the original copy
            let valueCopy = value.slice(0)

            //if strict is not true, it is going to trim all spaces and validate it further
            if (strict !== true) {
                valueCopy = valueCopy.replace(/ /g, '')
            }

            if (!NpmValidator.isAlphanumeric(valueCopy)) {
                return getMessage("not_alphanumeric");
            }
        }
    }

    function isNumber(value) {
        if (!NpmValidator.isEmpty(value)) {
            if (!NpmValidator.isInt(value)) {
                return getMessage("invalid_number");
            }
        }
    }

    /** validates integer. (minimum value by default is -1000000)
     * @param maxVal => maximum value allowed for value
     * @param value => input value
     */
    function maxValue(maxVal, value) {
        if (!NpmValidator.isEmpty(value)) {
            if (!(value <= maxVal)) {
                return getMessage("more_than_max_value");
            }
        }
    }

    /** validates integer.(maximum value by default is 1000000)
     * @param minVal => minimum value allowed for value
     * @param value => input value
     */
    function minValue(minVal, value) {
        const stringValue = `${value}`;
        if (!NpmValidator.isEmpty(stringValue)) {
            if (!(value >= minVal)) {
                return getMessage("not_enough_length");
            }
        }
    }

    function passwordMatch(password, passwordConfirm) {
        if (!NpmValidator.equals(password, passwordConfirm)) {
            return getMessage("password_does_not_match");
        }
    }


    function shouldNotMatch(oldPassword, newPassword) {
        if (NpmValidator.equals(oldPassword, newPassword)) {
            return getMessage("password_is_same");
        }
    }

    function isDate(value) {
        if (!NpmValidator.isISO8601(value)) {
            return getMessage("invalid_date");
        }
    }

    /**
     * @param Boolean isMobileValid     It is sent by the state. So if it is false it returns the error message
     * @param Any     value             Not required but it is better to just write it in the function rather than recreating a logic
     * @return string                   Validation message
     * */
    function isMobile(isMobileValid, value) {
        if (isMobileValid !== 'true') {
            return getMessage("invalid_mobile");
        }
    }
}