import validator from 'validator';

export const isValidEmail = (email) => validator.isEmail(email);

export const isInputEmpty = (input) => validator.isEmpty(input);

export const isMessageLengthValid = (message) => validator.isLength(message, {min: 10})