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

	const {errors, isValid} = validate({
			email : [email,'isRequired','isEmail'],
			username : [username,'isRequired'],
			first_name : [first_name,'isRequired','max(20)','min(5)']
		})

	return {errors, isValid}
}	

```

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
clone this repository( https://github.com/avinash403/validator-js.git ), make your changes and raise a pull request to development branch


