# validator-js
Provides an easy way to validate forms and gives custom error messages

### Installation by npm
	$ npm install validator-js --save 

### Usage Example
``` 
import {validator} from 'validator-js';


function validateTestData(data)
{
	const {email, username, first_name} = data;

	/*
	 * validate accepts an object, something like 
	 * validate({
	 *		keyName1 : [ keyValue1, 'condition1','condition2' ],
	 *		keyName2 : [ keyValue2, 'condition3','condition4' ]
	 *	})
	 */
	const {errors, isValid} = validate({
			email : [email,'isRequired','isEmail'],
			username : [username,'isRequired'],
			first_name : [first_name,'isRequired','max(20)','min(5)']
		});

	/*
	 * errors will be an array of object, something like
	 * [email: "this field is required", username : "this field is required", first_name:"this field is required"]
	 */
	return {errors, isValid};
}	

```

### Create your own custom messages
Create a file with name messages.js

### Custom messages through a function (in case message is coming from a language file)
Pass a create a function and pass


### Available Validations
* isRequired
* max(int)
* min(int)
* isEmail
* isAlpha
* isAlphaNumeric
* isNumber
* maxValue
* minValue
* passwordMatch
* shouldNotMatch
* isDate
* isMobile

### Test
Run test by simply typing `npm test` from the root directory of this package.

### Contribute on github
Clone this repository( https://github.com/avinash403/validator-js.git ), make your changes and raise a pull request to development branch


