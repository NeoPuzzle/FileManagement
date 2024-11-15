export const validateLogin = (input) => {
    const errors = {};
    const usernameRegex = /.+/;
    const passwordRegex =/.+/;

    if(!usernameRegex.test(input.username)) {
        errors.username = 'Please enter a username';
    }

    if(!passwordRegex.test(input.password)) {
        errors.password = 'Please enter a password';
    }

    return errors;
}