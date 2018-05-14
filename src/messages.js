export const message={
    //validation errors
    "required":"This field is required",
    "invalidEmail": "Invalid email",
    "invalidMobile":"Invalid mobile number",
    "notAlpha":"Input should only consist of alphabets",
    "notAlphanumeric":"Input should only consist of alphabets and numbers",
    "passwordNotMatch":"Password doesn't match",
    "invalidDate":"Not a valid date",
    "notNumber":"Input should only consist of numbers",
    "passwordIsSame":"new password is same as old. Please choose a different password.",

    //non-validation errors
    "badConnection":"Unable to connect",
    "errorAtServer":"Some error occurred at the server",
    "notEntered":"NOT ENTERED",//if a field is empty this will be displayed instead of empty text
    "notAssigned":"NOT ASSIGNED"//if a workout is not assigned, this will be displayed instead of empty field
};

export function exceededMaxLength(length) {
    return "length cannot be more than "+length+" characters";
}

export function notEnoughLength(length) {
    return "length should be at least "+length+" characters";
}

export function moreThanMaxValue(value) {
    return `value more than ${value} is not allowed`;
}

export function lessThanMinValue(value) {
    return `value less than ${value} is not allowed`;
}