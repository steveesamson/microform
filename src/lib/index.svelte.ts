import type {
	FormOptions,
	FormSubmit,
	Microform,
	MicroFormProps,
	MicroFormReturn,
	ValidatorMap,
	ValidatorType
} from './types.js';
import { formStore } from './internal.svelte.js';
import { formAction } from './form-action.svelte.js';

const microform: Microform = (props?: MicroFormProps): MicroFormReturn => {
	// form default values
	// const data = props?.data || {};
	const defaultOptions: FormOptions = {
		validateEvent: 'blur',
		validators: {} as ValidatorMap<ValidatorType>,
		fieldWaitTimeInMilliSecond: 200,
		debug: false
	}
	const { options: userOptions = {}, data = {} } = props || {};
	const options: FormOptions = { ...defaultOptions, ...userOptions };

	// form state
	const { values, errors, unfits, reset, sanity, validationMap } = formStore(data);

	const form = formAction(values, errors, unfits, (_sanity: boolean) => {
		sanity.ok = _sanity;
	}, options, validationMap);

	const handleSubmit = (e: Event, handler: FormSubmit) => {
		e.preventDefault();
		if (!sanity.ok) return;

		handler({ ...values });
	};

	const onsubmit = (handler: FormSubmit) => {
		return (e: Event) => {
			handleSubmit(e, handler);
		};
	};

	const submit = (formNode: HTMLFormElement, handler: FormSubmit) => {

		$effect(() => {
			const localHandler = (e: SubmitEvent) => {
				handleSubmit(e, handler);
			};
			formNode.addEventListener('submit', localHandler);
			return () => formNode.removeEventListener('submit', localHandler);
		})

	};

	return {
		values,
		errors,
		sanity,
		form,
		submit,
		onsubmit,
		reset
	};
};
export default microform;