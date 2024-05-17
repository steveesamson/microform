import { get, type Writable } from "svelte/store";
import type {  Params, ValidateArgs } from "./types.js";
import { makeName } from "./utils.js";


const regexes = {
    number: /^[-+]?[0-9]+(\.[0-9]+)?$/g,
    alpha: /^[A-Z\s]+$/gi,
    alphanum: /^[A-Z]+[A-Z0-9]+$/gi,
    integer: /^[-+]?\d+$/g,
    email: /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/gi,
    url: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
    ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g,
} as const;


const getErrorText = (inputName: string, errorType: string, extra: string = '') => {
    inputName = makeName(inputName);

    switch (errorType.toLowerCase()) {
        case 'required':
            return inputName + ' is mandatory.';
        case 'match':
            return inputName + ' does not match ' + makeName(extra);
        case 'func':
            return inputName + extra;
        case 'captcha':
            return inputName + ' does not match the image.';
        case 'email':
            return inputName + ' should be a valid email.';
        case 'url':
            return inputName + ' should be a valid URL.';
        case 'cron':
            return inputName + ' should be a valid cron expression.';
        case 'ip':
            return inputName + ' should be a valid IP.';
        case 'integer':
            return inputName + ' must be an integer.';
        case 'number':
            return inputName + ' should be a number.';
        case 'alpha':
            return inputName + ' should be a string of alphabets.';
        case 'alphanum':
            return inputName + ' should be a string of alphanumerics starting with alphabets.';
        case 'min-length':
            return inputName + ' must be at least ' + extra + ' characters long.';
        case 'max-length':
            return inputName + ' must not be more than ' + extra + ' characters long.';
        case 'length':
            return inputName + ' must be exactly ' + extra + ' characters long.';
        // case 'length':
        //     return inputName + ' must not be greater than ' + extra + '.';
        default:
            return errorType;
    }
};

const checkFileSize = (node: HTMLInputElement | undefined, maxFileSizeInMB: number) => {
    if (!node) return "";
    const { files } = node;
    if (!files) return `${node.name} is required`;

    const max = maxFileSizeInMB * 1024 * 1024;
    for (const file of files) {
        if (file.size > max) {
            return `File '${file.name}' is larger the ${maxFileSizeInMB}MB.`;
        }
    }
    return "";
}
export const useValidator = (errors: Writable<Params>, values: Writable<Params>) => {
    const setError = (name: string, error: string) => {
        errors.update((prev: Params) => {
            return { ...prev, [name]: error };
        })
    }

    return async ({ name, value, validations = '', node = undefined }: ValidateArgs) => {
        let error: string = '';
        if (validations) {
            const inputName = name,
                _validations = validations.split('|');

            for (let i = 0; i < _validations.length; ++i) {

                const validation = _validations[i],
                    typeDetails = validation.split(':'),
                    type = typeDetails[0].trim();

                let partyName, partyValue;

                switch (type.toLowerCase()) {
                    case 'required':
                        error = !value || !value.length ? getErrorText(inputName, 'required') : '';
                        setError(name, error);
                        break;

                    case 'match':
                        error = typeDetails.length < 2 ? inputName + ': match validation requires party target' : '';
                        setError(name, error);
                        if (error) break;

                        partyName = typeDetails[1].trim();
                        partyValue = get(values)[partyName] || '';

                        error = !value || value !== partyValue ? getErrorText(inputName, 'match', typeDetails[1]) : '';
                        setError(name, error);

                        break;
                    case 'email':
                        error = !value || !value.match(regexes['email']) ? getErrorText(inputName, 'email') : '';
                        setError(name, error);
                        break;
                    case 'url':
                        error = !value || !value.match(regexes['url']) ? getErrorText(inputName, 'url') : '';
                        setError(name, error);
                        break;
                    case 'ip':
                        error = !value || !value.match(regexes['ip']) ? getErrorText(inputName, 'ip') : '';
                        setError(name, error);
                        break;
                    case 'integer':
                        error = !value || !value.match(regexes['integer']) ? getErrorText(inputName, 'integer') : '';
                        setError(name, error);
                        break;
                    case 'number':
                        error = !value || !value.match(regexes['number']) ? getErrorText(inputName, 'number') : '';
                        setError(name, error);
                        break;
                    case 'alpha':
                        error = !value || !value.match(regexes['alpha']) ? getErrorText(inputName, 'alpha') : '';
                        setError(name, error);
                        break;
                    case 'alphanum':
                        error =
                            !value || !value.match(regexes['alphanum']) ? getErrorText(inputName, 'alphanum') : '';
                        setError(name, error);
                        break;
                    case 'min-length':
                        error = typeDetails.length < 2 ? inputName + ': min-length validation requires width' : '';
                        setError(name, error);
                        if (error) break;
                        error =
                            !value || value.length < parseInt(typeDetails[1], 10)
                                ? getErrorText(inputName, 'min-length', typeDetails[1])
                                : '';
                        setError(name, error);
                        break;
                    case 'max-length':
                        error = typeDetails.length < 2 ? inputName + ': max-length validation requires width' : '';
                        setError(name, error);
                        if (error) break;
                        error =
                            !value || value.length > parseInt(typeDetails[1], 10)
                                ? getErrorText(inputName, 'max-length', typeDetails[1])
                                : '';
                        setError(name, error);
                        break;
                    case 'length':
                        error = typeDetails.length < 2 ? inputName + ': length validation requires width' : '';
                        setError(name, error);

                        if (error) break;
                        error =
                            !value || value.length !== parseInt(typeDetails[1], 10)
                                ? getErrorText(inputName, 'length', typeDetails[1])
                                : '';
                        setError(name, error);
                        break;
                    case 'max':
                        error = typeDetails.length < 2 ? inputName + ': max validation requires max value' : '';
                        setError(name, error);

                        if (error) break;
                        error =
                            !value || parseInt(value, 10) !== parseInt(typeDetails[1], 10)
                                ? getErrorText(inputName, 'max', typeDetails[1])
                                : '';
                        setError(name, error);
                        break;
                    case 'max-file-size-mb':
                        error = typeDetails.length < 2 ? inputName + ': max file size in MB validation requires max-file-size-mb value' : '';
                        setError(name, error);

                        if (error) break;

                        error = checkFileSize(node as HTMLInputElement | undefined, parseInt(typeDetails[1], 10));
                        setError(name, error);
                        break;
                    default:
                }
                if (error) {
                    setError(name, error);
                    break;
                }
            } //end
        }
    };

};


