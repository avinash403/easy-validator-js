import {Validation} from 'validator'


const validator = new Validation;

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

})