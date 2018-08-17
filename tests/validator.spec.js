import {Validator} from 'validator-js'

var _= require('lodash');


const validator = new Validator;

describe('validate',()=>{

	
    it('returns isValid as false if isRequired is passed but value is empty', () => {

        const testField = ""
        
        const errors = validator.validate({
            testField: [testField, 'isRequired'],
        });

        expect(errors.isValid).toBe(false)

    })

    it('returns isValid as true if isRequired is passed and value is non-empty', () => {
        
        const testField = "test value"
        
        const errors = validator.validate({
            testField: [testField, 'isRequired'],
        });
        
        expect(errors.isValid).toBe(true)

    })
    
    it('returns isValid as true if isRequired is passed and value contains an apostrophe', () => {

        const testField = "test'123"
        
        const errors = validator.validate({
            testField: [testField, 'isRequired'],
        });

        expect(errors.isValid).toBe(true)        
    })

    it('return isValid as true if last character is escape character', () => {

        const testField = "test'123\\"

        const errors = validator.validate({
            testField: [testField, 'isRequired'],
        });

        expect(errors.isValid).toBe(true)        
    })


    it('returns isValid as false if max(5) is passed and value has 6 or more characters', () => {

        const testField = "123456"

        const errors = validator.validate({
            testField: [testField, 'max(5)'],
        });

        expect(errors.isValid).toBe(false)
    })

    it('returns isValid as true if max(5) is passed and value has 5 or less characters', () => {
        const testField = "12345"

        const errors = validator.validate({
            testField: [testField, 'max(5)'],
        });
        
        expect(errors.isValid).toBe(true)
    })

    it('returns isValid as false if min(5) is passed and value has 4 or less characters', () => {

        const testField = "1234"

        const errors = validator.validate({
            testField: [testField, 'min(5)'],
        });

        expect(errors.isValid).toBe(false)
    })

    it('returns isValid as true if min(5) is passed and value has 5 or more characters', () => {
    
        const testField = "123456789"
    
        const errors = validator.validate({
            testField: [testField, 'min(5)'],
        });
    
        expect(errors.isValid).toBe(true)
    })
    
    it('returns isValid as false if isEmail is passed and value is invalid email', () => {
    
        const testField = "invalid email"
    
        const errors = validator.validate({
            testField: [testField, 'isEmail'],
        });
    
        expect(errors.isValid).toBe(false)
    })

    it('returns isValid as true if isEmail is passed and value is valid email', () => {
        
        const testField = "test@email.com"
        
        const errors = validator.validate({
            testField: [testField, 'isEmail'],
        });
        
        expect(errors.isValid).toBe(true)
    })

    it('returns isValid as false if isAlpha is passed without parameter(strict) and value has non alphabetic characters', () => {
        
        const testField = "test123"
        
        const errors = validator.validate({
            testField: [testField, 'isAlpha(false)'],
        });
        expect(errors.isValid).toBe(false)
    })

    it('returns isValid as true if isAlpha(false) is passed without parameter(strict) and value has no alphabetic characters', () => {

        const testField = "test"

        const errors = validator.validate({
            testField: [testField, 'isAlpha(false)'],
        });

        expect(errors.isValid).toBe(true)
    })

    it('returns isValid as true if isAlpha(false) is passed without parameter(strict) and value has space with alphabetic characters', () => {

        const testField = "test test"

        const errors = validator.validate({
            testField: [testField, 'isAlpha(false)'],
        });

        expect(errors.isValid).toBe(true)
    })

    it('returns isValid as false if isAlpha(true) is passed with parameter(strict) and value has space with alphabetic characters', () => {

        const testField = "test test "

        const errors = validator.validate({
            testField: [testField, 'isAlpha(true)'],
        });

        expect(errors.isValid).toBe(false)
    })

    it('returns isValid as false if isAlphanumeric(false) is passed without parameter(strict) and value has non non-Alphanumeric characters', () => {

        const testField = "test123&33"

        const errors = validator.validate({
            testField: [testField, 'isAlphanumeric(false)'],
        });

        expect(errors.isValid).toBe(false)
    })

    it('returns isValid as false if isAlphanumeric is passed without parameter(strict) and value has no non-alphanumeric characters', () => {
        
        const testField = "test"
        
        const errors = validator.validate({
            testField: [testField, 'isAlphanumeric(false)'],
        });
        
        expect(errors.isValid).toBe(true)
    })

    it('returns isValid as truie if isAlphanumeric is passed without parameter(strict) and value has space with alphanumeric characters', () => {

        const testField = "test test"

        const errors = validator.validate({
            testField: [testField, 'isAlphanumeric(false)'],
        });

        expect(errors.isValid).toBe(true)
    })

    it('returns isValid as false if isAlphanumeric(true) is passed with parameter(strict) and value has space with isAlphanumeric characters', () => {

        const testField = "test test "

        const errors = validator.validate({
            testField: [testField, 'isAlphanumeric(true)'],
        });

        expect(errors.isValid).toBe(false)
    })

    it('returns isValid as false if `isValidWithRegex` is passed with invalid string', () => {

        const testField = "A drop of ink may make a million think"

        const errors = validator.validate({
            testField: [testField, 'isValidWithRegex(/z/)'],
        });

        expect(errors.isValid).toBe(false)
    })

    it('returns isValid as false if `isValidWithRegex` is passed with valid string', () => {

        const testField = "A drop of ink may make a million think"

        const errors = validator.validate({
            testField: [testField, 'isValidWithRegex(/k/i)'],
        });

        expect(errors.isValid).toBe(true)
    })


    it('returns correct validation message if a message is passed as second argument', () => {

        const testField = "A drop of ink may make a million think"

        const errors = validator.validate({
            testField: [testField, 'isValidWithRegex(/k/i)'],
        });

        expect(errors.isValid).toBe(true)
    })

    it('returns custom validation message, if validation rule is passed as object for isRequired', () => {

        const testField = ""

        //allow message to get concatenate based in 
        //or make an object ?
        const errors = validator.validate({
            testField: [testField,{'isRequired':'This field is a must bitch!'}],
        });
        
        expect(errors.isValid).toBe(false)
        
        expect(errors.errors.testField).toBe('This field is a must bitch!')

    })

    it('returns custom validation message, if validation rule is passed as object for isValidWithRegex', () => {

        const testField = ""

        //allow message to get concatenate based in 
        //or make an object ?
        const errors = validator.validate({
            testField: [testField,{'isValidWithRegex(/a/i)':'not valid with regex bitch!'}],
        });
        
        expect(errors.isValid).toBe(false)
        
        expect(errors.errors.testField).toBe('not valid with regex bitch!')

    })

})