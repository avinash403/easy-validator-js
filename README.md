# Easy ValidatorJs
Provides an easy way to validate forms and gives custom error messages.
Ideal with frameworks like reactJs and vueJs

### Installation by npm
	$ npm install easy-validator-js --save 

### Usage Example
``` 
import {Validator} from 'validator-js';


function validateTestData(data)
{
	const {email, username, first_name} = data;

	//creating a validator object
	const validator = new Validator();

	/*
	 * validate accepts an object, something like 
	 * validate({
	 *		keyName1 : [ keyValue1, 'condition1','condition2' ],
	 *		keyName2 : [ keyValue2, 'condition3','condition4' ]
	 *	})
	 */
	const {errors, isValid} = validate.validate({
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

### Default Messages
```
* required 			: this field is required
* max_length_exceeded   	: maximum length exceeded
* not_enough_length 		: too short
* invalid_email 		: invalid email
* not_alpha 			: input should only consist of alphabets
* not_alphanumeric 		: input should only consist of alphabets and numbers
* invalid_number 		: input should only consist of numbers
* more_than_max_value 		: maximum value exceeded
* less_than_min_value 		: too small
* password_is_same 		: new password is same as old. Please choose a different password
* password_does_not_match 	: Password does not match
* invalid_date 			: not a valid date
* invalid_mobile 		: invalid mobile number
```


### Create your own custom messages

By default there are fixed validation messages which you can find in the next section, but it can be customized to get custom validation messages by passing a method while creating the object. Like so:
```
import {Validator} from 'validator-js'

function getMessage(key){
	//return message based on key
}

//passing method to the class
const validator = new Validator(getMessage);

```

`getMessage ` will recieve following keys : 
```
* required
* max_length_exceeded
* not_enough_length
* invalid_email
* not_alpha
* not_alphanumeric
* invalid_number
* more_than_max_value
* less_than_min_value
* password_is_same
* password_does_not_match
* invalid_date
* invalid_mobile
```

Now, you can give whatever value you want to give to when any of the above key is passed. The easiet way of doing it is by creating and importing a javascript array which has keys as above and value as your custom message.
Something like this : 
```
export const customMessages = {

    required: "custom message",

    max_length_exceeded: "custom message",

    not_enough_length: "custom message",

    invalid_email: "custom message",

    not_alpha: "custom message",

    not_alphanumeric: "custom message",

    invalid_number: "custom message",

    more_than_max_value: "custom message",

    less_than_min_value: "custom message",

    password_is_same: "custom message",

    password_does_not_match: "custom message",

    invalid_date: "custom message",

    invalid_mobile: "custom message",
};
```

Save this file with some name let's say messages.js
Now, import messages and use it in `getMessage()` function

```
import {customMessages} from 'messages'
import {Validator} from 'validator-js'

function getMessage(key){
	return customMessages[key];
}

//passing method to the class
const validator = new Validator(getMessage);

```

Finally, you are all set up for seeing your own custom messages


### Messages coming from language file (in case of laravel with vue)
You can create the above message keys in your language file and make a function which simply gives the values corresponding to the given key and pass the same function as class arguments like so:
```
import {Validator} from 'validator-js'

function getMessage(key){
	//get the value of the passed key from language file
}

//passing method to the class
const validator = new Validator(getMessage);

```


### Test
Run test by simply typing `npm test` from the root directory of this package.

### Contribute on github
Clone this repository( https://github.com/avinash403/easy-validator-js.git ), make your changes and raise a pull request to development branch


