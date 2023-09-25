import Joi from 'joi';

/**
 * Returns whether the provided string is a valid email
 * @param {string} email 
 * @returns boolean
 */
export const IsEmailValid = (email) => { 
    const validEmail = Joi.string()
        .email({ tlds: { allow: false } })
        .validate(email);
    return !validEmail.error;
};
