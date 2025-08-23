import type {
	FieldProps,
	ValidateArgs,
	ValidatorType,
	ValidatorMap,
	ValidatorKey,
	Validator,
	FormErrors,
	FormValues
} from './types.js';
import { makeName, isValidFileSize } from './utils.js';

const regexes = {
	number: /^[-+]?[0-9]+(\.[0-9]+)?$/g,
	alpha: /^[A-Z\s]+$/gi,
	alphanum: /^[A-Z]+[A-Z0-9]+$/gi,
	integer: /^[-+]?\d+$/g,
	email: /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/gi,
	url: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
	ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g
} as const;

export const IS_REQUIRED = 'required';
export const IS_EMAIL = 'email';
export const IS_URL = 'url';
export const IS_IP = 'ip';
export const IS_INTEGER = 'integer';
export const IS_NUMBER = 'number';
export const IS_ALPHA = 'alpha';
export const IS_ALPHANUM = 'alphanum';
export const IS_MIN_LEN = 'minlen';
export const IS_MAX_LEN = 'maxlen';
export const IS_LEN = 'len';
export const IS_MIN = 'min';
export const IS_MAX = 'max';
export const IT_MATCHES = 'match';
export const IS_FILE_SIZE_MB = 'file-size-mb';

const getDefaultValidators = (): ValidatorMap<ValidatorType> => {
	const validators: ValidatorMap<ValidatorType> = {
		[IS_REQUIRED]: ({ label, value }: FieldProps) => {
			if (!value || (Array.isArray(value) && !value.length)) {
				return `${label} is mandatory.`;
			}

			return '';
		},
		[IS_EMAIL]: ({ value, label }: FieldProps) => {
			return !!value && !value.match(regexes['email']) ? `${label} should be a valid email.` : '';
		},
		[IS_URL]: ({ value, label }: FieldProps) => {
			return !!value && !value.match(regexes['url']) ? `${label} should be a valid URL.` : '';
		},
		[IS_IP]: ({ value, label }: FieldProps) => {
			return !!value && !value.match(regexes['ip']) ? `${label} should be a valid IP.` : '';
		},
		[IS_INTEGER]: ({ value, label }: FieldProps) => {
			return !!value && !value.match(regexes['integer'])
				? `${label} must be an integer number.`
				: '';
		},
		[IS_NUMBER]: ({ value, label }: FieldProps) => {
			return !!value && !value.match(regexes['number']) ? `${label} must be a number.` : '';
		},
		[IS_ALPHA]: ({ value, label }: FieldProps) => {
			return !!value && !value.match(regexes['alpha'])
				? `${label} should be a string of alphabets.`
				: '';
		},
		[IS_ALPHANUM]: ({ value, label }: FieldProps) => {
			return !!value && !value.match(regexes['alphanum'])
				? `${label} should be a string of alphanumerics starting with alphabets.`
				: '';
		},
		[IS_MIN_LEN]: ({ value, label, parts }: FieldProps) => {
			if (value) {
				if (!parts || parts.length < 2) {
					return `${label}: min-length validation requires minimum length.`;
				}
				const extra = parts[1].trim();

				return value.length >= parseInt(parts[1], 10)
					? ''
					: `${label} must be at least ${extra} characters long.`;
			}
			return '';
		},
		[IS_MAX_LEN]: ({ value, label, parts }: FieldProps) => {
			if (value) {
				if (!parts || parts.length < 2) {
					return `${label}: max-length validation requires maximum length.`;
				}
				const extra = parts[1].trim();
				return value.length <= parseInt(parts[1], 10)
					? ''
					: `${label} must be at most ${extra} characters long.`;
			}
			return '';
		},
		[IS_LEN]: ({ value, label, parts }: FieldProps) => {
			if (value) {
				if (!parts || parts.length < 2) {
					return `${label}: length validation requires length.`;
				}
				const extra = parts[1].trim();
				return value.length === parseInt(parts[1], 10)
					? ''
					: `${label} must exactly be ${extra} characters long.`;
			}
			return '';
		},
		[IS_MAX]: ({ value, label, parts }: FieldProps) => {
			if (value) {
				if (!parts || parts.length < 2) {
					return `${label}: max validation requires the maximum value.`;
				}
				const extra = parts[1].trim();
				return parseInt(value, 10) <= parseInt(parts[1], 10)
					? ''
					: `${label} must not be greater than ${extra}.`;
			}
			return '';
		},
		[IS_MIN]: ({ value, label, parts }: FieldProps) => {
			if (value) {
				if (!parts || parts.length < 2) {
					return `${label}: min validation requires the minimum value.`;
				}
				const extra = parts[1].trim();
				return parseInt(value, 10) >= parseInt(parts[1], 10)
					? ''
					: `${label} must not be less than ${extra}.`;
			}
			return '';
		},
		[IT_MATCHES]: ({ values, value, label, parts }: FieldProps) => {
			if (value) {
				if (!parts || parts.length < 2) {
					return `${label}: match validation requires id of field to match`;
				}
				const partyName: string = parts[1].trim();
				const partyValue = values[partyName];
				return value === partyValue ? '' : `${label} does not match ${makeName(partyName)}.`;
			}
			return '';
		},
		[IS_FILE_SIZE_MB]: ({ value, node, label, parts }: FieldProps) => {
			if (value) {
				if (!parts || parts.length < 2) {
					return `${label}: max file size in MB validation requires maximum file size of mb value.`;
				}
				const extra = parts[1].trim();
				return isValidFileSize(node as HTMLInputElement | undefined, parseInt(extra, 10));
			}
			return '';
		}
	};
	return validators;
};

export const useValidator = (
	errors: FormErrors,
	values: FormValues,
	validators: ValidatorMap<ValidatorType> = getDefaultValidators()
) => {

	const setError = (name: string, error: string) => {
		errors[name] = error ?? '';
	};

	return {
		validate: async ({ name, value, validations = [], node = undefined }: ValidateArgs) => {
			if (validations.length) {
				const _validations = validations.includes('required')
					? ['required', ...validations.filter((val: Validator) => val !== 'required')]
					: [...validations];

				for (let i = 0; i < _validations.length; ++i) {
					const validation = _validations[i],
						parts = validation.split(':'),
						type = parts[0].trim() as ValidatorKey;

					const validator = validators[type];
					if (!validator) return;

					const error: string = validator({
						name,
						label: makeName(name),
						value,
						values,
						node,
						parts
					});
					setError(name, error ? error : '');
					if (error) {
						break;
					}
				}
			}
		},
		validators
	};
};