import { type Writable, get } from 'svelte/store';
import { useValidator } from './form-validators.js';
import { debounce, getEditableContent } from './utils.js';
import type {
	ActionOptions,
	FieldType,
	FormOptions,
	InputType,
	FormAction,
	ValidateArgs,
	ValidatorKey,
	FormValues,
	FormErrors
} from './types.js';

import type { Params } from './internal.js';

const isField = (node: unknown): node is FieldType => {
	return (
		node instanceof HTMLSelectElement ||
		node instanceof HTMLInputElement ||
		node instanceof HTMLTextAreaElement
	);
};
const isExcluded = (node: unknown) => {
	return (
		node instanceof HTMLInputElement && ['radio', 'checkbox'].includes(node.type.toLowerCase())
	);
};
const isCheckbox = (node: unknown) => {
	return node instanceof HTMLInputElement && ['checkbox'].includes(node.type.toLowerCase());
};
const isRadio = (node: unknown) => {
	return node instanceof HTMLInputElement && ['radio'].includes(node.type.toLowerCase());
};

const checkFormFitness = (
	values: Writable<Params>,
	validationMap: Params,
	validate: (vargs: ValidateArgs) => Promise<void>
) => {
	const _values = get(values);
	for (const [name, { validations }] of Object.entries(validationMap)) {
		validate({ name, value: _values[name], validations });
	}
};

export const formAction = (
	values: FormValues,
	errors: FormErrors,
	unfits: FormErrors,
	onSanity: (sanity: boolean) => void,
	options: FormOptions,
	validationMap: Params
): FormAction => {
	const { validators: customValidators } = options;
	const { validate, validators } = useValidator(errors, values);

	// override
	if (customValidators) {
		for (const [key, val] of Object.entries(customValidators)) {
			validators[key as ValidatorKey] = val;
		}
	}

	const hasError = (next: string) => !!next;
	let canWatch = false;// $state(false);
	const evaluateSanity = () => {
		const { validate: validateUnfit } = useValidator(unfits, values, validators);
		checkFormFitness(values, validationMap, validateUnfit);
		const withErrors = Object.values(errors).some(hasError);
		const withUnfits = Object.values(unfits).some(hasError);
		onSanity(!withErrors && !withUnfits && canWatch);
	}
	$effect(() => {
		if (options.debug) {
			console.log('values changed...')
		}
		Object.values(values);
		evaluateSanity();
	})
	const start = debounce(() => {
		canWatch = true;
		if (options.debug) {
			console.log('microform initialized...')
		}
	}, options.fieldWaitTimeInMilliSecond!)

	return (node: HTMLElement, eventProps?: ActionOptions) => {
		start();
		const nodeName = isField(node) ? node.name : '';
		const { name: dsname = nodeName } = node.dataset || {};
		const {
			name = dsname,
			validations = [],
			validateEvent = (options.validateEvent = 'blur'),
			html = false
		} = eventProps || {};
		validationMap[name] = { validations, html, nodeRef: node };

		const storedValue = get(values)[name] || '';
		let defValue = storedValue;

		if (isField(node) && !isExcluded(node)) {
			defValue = node.value || storedValue;
			node.value = defValue;
		} else if (node.isContentEditable) {
			defValue = node.innerHTML || storedValue;
			node.innerHTML = defValue;
		}

		values.update((data: Params) => {
			return { ...data, [name]: defValue };
		});

		let unsubscribe: () => void;

		const updateNode = (e: Event) => {
			if (!unsubscribe) {
				unsubscribe = values.subscribe((data: Params) => {
					validate({ name, value: data[name], validations, node });
				});
			}

			if (isField(node) && !isExcluded(node)) {
				const value = (e.target as InputType).value || '';
				values.update((data: Params) => {
					return { ...data, [name]: value };
				});
			} else if (node.isContentEditable) {
				const { value: htm, text } = getEditableContent({ target: node }, html);
				values.update((data: Params) => {
					return { ...data, [name]: htm, [`${name}-text`]: text };
				});
			} else if (isCheckbox(node)) {
				const { checked, value: val } = node as HTMLInputElement;
				const { [name]: fieldValue } = get(values);
				let current = fieldValue.split(',');
				if (checked) {
					current.push(val);
				} else {
					current = current.filter((next: string) => next !== val);
				}
				values.update((data: Params) => {
					return { ...data, [name]: [...new Set(current)].join(',') };
				});
			} else if (isRadio(node)) {
				const { value: fvalue } = node as HTMLInputElement;
				values.update((data: Params) => {
					return { ...data, [name]: fvalue };
				});
			}

			validate({ name, value: values[name], validations, node });
		};


		$effect(() => {
			node.addEventListener(validateEvent, updateNode);
			return () => {
				node.removeEventListener(validateEvent, updateNode);
			}
		};
	};
};
