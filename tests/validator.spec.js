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

    it('returns isValid as false if isAlphaNumeric(false) is passed without parameter(strict) and value has non non-Alphanumeric characters', () => {

        const testField = "test123&33"

        const errors = validator.validate({
            testField: [testField, 'isAlphaNumeric(false)'],
        });

        expect(errors.isValid).toBe(false)
    })

    it('returns isValid as false if isAlphaNumeric is passed without parameter(strict) and value has no non-alphanumeric characters', () => {

        const testField = "test"

        const errors = validator.validate({
            testField: [testField, 'isAlphaNumeric(false)'],
        });

        expect(errors.isValid).toBe(true)
    })

    it('returns isValid as truie if isAlphaNumeric is passed without parameter(strict) and value has space with alphanumeric characters', () => {

        const testField = "test test"

        const errors = validator.validate({
            testField: [testField, 'isAlphaNumeric(false)'],
        });

        expect(errors.isValid).toBe(true)
    })

    it('returns isValid as false if isAlphaNumeric(true) is passed with parameter(strict) and value has space with isAlphaNumeric characters', () => {

        const testField = "test test "

        const errors = validator.validate({
            testField: [testField, 'isAlphaNumeric(true)'],
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

    it('returns validation message, if validation rule is passed as object for isUrl', () => {

        const testField = "https:/stackoverflow.com"

        const errors = validator.validate({
            testField: [testField,'isUrl'],
        });

        expect(errors.isValid).toBe(false)

        expect(errors.errors.testField).toBe('not a valid url')

    })

		it('passes url validation for valid url', () => {

				const testField = "https://stackoverflow.com"

				const errors = validator.validate({
						testField: [testField,'isUrl'],
				});

				expect(errors.isValid).toBe(true)
		})

    it('passes url validation for empty field', () => {

				const testField = ""

				const errors = validator.validate({
						testField: [testField,'isUrl'],
				});

				expect(errors.isValid).toBe(true)
		})


    it('returns isValid as false if `UserName` is passed and value has spaces', () => {
      const testField = "test test "
      const errors = validator.validate({
        testField: [testField, 'isValidUserName'],
      });
      expect(errors.isValid).toBe(false)
    })

    it('returns isValid as false if `UserName` is passed and value has spacial char', () => {
      const testField = "testtest@"
      const errors = validator.validate({
          testField: [testField, 'isValidUserName'],
      });
      expect(errors.isValid).toBe(false)
    })

    it('returns isValid as true if `UserName` is passed and value is valid ', () => {
      const testField = "testtest"
      const errors = validator.validate({
          testField: [testField, 'isValidUserName'],
      });
      expect(errors.isValid).toBe(true)
    });

    it('returns isValid as true if `userName` is passed and value empty ', () => {
      const testField = ""
      const errors = validator.validate({
          testField: [testField, 'isValidUserName'],
      });
      expect(errors.isValid).toBe(true)
      expect(errors.errors).toEqual({})
    });

    it('returns isValid as false if `isNumber` is validated against non-number ', () => {
      const testField = "test String"
      const errors = validator.validate({
          testField: [testField, 'isNumber'],
      });
      expect(errors.isValid).toBe(false)
    });

    it('returns isValid as true if `isNumber` is validated against a valid number but as string', () => {
      const testField = "8089"
      const errors = validator.validate({
          testField: [testField, 'isNumber'],
      });
      expect(errors.isValid).toBe(true)
    });

    it('returns isValid as true if `isNumber` is validated against a valid number as number', () => {
      const testField = 8089
      const errors = validator.validate({
          testField: [testField, 'isNumber'],
      });
      expect(errors.isValid).toBe(true)
    });

    it('returns isValid as true if `isNumber` is validated against an empty string', () => {
      const testField = ''
      const errors = validator.validate({
          testField: [testField, 'isNumber'],
      });
      expect(errors.isValid).toBe(true)
    });

    it('returns isValid as false if `maxValue` is validated against an invalid value', () => {
      const testField = '21'
      const errors = validator.validate({
          testField: [testField, 'maxValue(20)'],
      });
      expect(errors.isValid).toBe(false)
    });

    it('returns isValid as true if `maxValue` is validated against a valid value', () => {
      const testField = '19'
      const errors = validator.validate({
          testField: [testField, 'maxValue(20)'],
      });
      expect(errors.isValid).toBe(true)
    });

    it('returns isValid as false if `minValue` is validated against an invalid value', () => {
      const testField = '19'
      const errors = validator.validate({
          testField: [testField, 'minValue(20)'],
      });
      expect(errors.isValid).toBe(false)
    });

    it('returns isValid as true if `minValue` is validated against an valid value', () => {
      const testField = '21'
      const errors = validator.validate({
          testField: [testField, 'minValue(20)'],
      });
      expect(errors.isValid).toBe(true)
    });

    it('returns isValid as true if `passwordMatch` is validated against a non matching password', () => {
      const testField = 'second_password'
      const errors = validator.validate({
          testField: [testField, 'passwordMatch("first_password")'],
      });
      expect(errors.isValid).toBe(false)
    });

    it('returns isValid as true if `passwordMatch` is validated against a matching password', () => {
      const testField = 'second_password'
      const errors = validator.validate({
          testField: [testField, 'passwordMatch("second_password")'],
      });
      expect(errors.isValid).toBe(true)
    });

    it('returns isValid as false if `shouldNotMatch` is validated against a matching value', () => {
      const testField = 'first_value'
      const errors = validator.validate({
          testField: [testField, 'shouldNotMatch("first_value")'],
      });
      expect(errors.isValid).toBe(false)
    });

    it('returns isValid as true if `shouldNotMatch` is validated against a non matching value', () => {
      const testField = 'second_value'
      const errors = validator.validate({
          testField: [testField, 'shouldNotMatch("first_value")'],
      });
      expect(errors.isValid).toBe(true)
    });
})
