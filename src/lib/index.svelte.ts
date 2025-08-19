import { formAction } from './form-action.svelte.js';
import type {
	// FormErrors,
	// FormSanity,
	FormSubmit,
	// FormValues,
	Microform,
	MicroFormProps,
	MicroFormReturn,
	ValidatorMap,
	ValidatorType
} from './types.js';
import { formState, type Params } from './internal.svelte.js';

const microform: Microform = (props?: MicroFormProps): MicroFormReturn => {
	// form default values
	const data = props?.data || {};
	// form state
	const state = formState(data);

	const validationMap: Params = {};
	const {
		options = {
			validateEvent: 'blur',
			validators: {} as ValidatorMap<ValidatorType>
		}
	} = props || {};

	const updateSanity = (isOk: boolean) => {
		state.sanity.ok = isOk;
	};
	const form = formAction(state.values, state.errors, state.unfits, updateSanity, options, validationMap);

	const handleSubmit = (e: Event, handler: FormSubmit) => {
		e.preventDefault();
		if (!state.sanity.ok) return;

		handler({ ...state.values });
	};

	const onsubmit = (handler: FormSubmit) => {
		const onSubmit = async (e: Event) => {
			handleSubmit(e, handler);
		};
		return onSubmit;
	};

	const submit = (formNode: HTMLFormElement, handler: FormSubmit) => {
		formNode.addEventListener('submit', (e: SubmitEvent) => {
			handleSubmit(e, handler);
		});
	};

	const reset = () => {
		const defaultKeys = Object.keys({ ...data });
		for (const [key,] of Object.entries(state.values)) {
			if (defaultKeys.includes(key)) {
				state.values[key] = data[key];
			} else {
				delete state.values[key];
			}
		}
		state.errors = {};
		state.unfits = {};
		state.sanity.ok = false;

		for (const [name, { nodeRef, html }] of Object.entries(validationMap).filter(
			([, { nodeRef }]: [string, Params]) => !!nodeRef
		)) {
			if (nodeRef) {
				if (nodeRef.isContentEditable) {
					nodeRef[html ? 'innerHTML' : 'textContent'] = data[name] || '';
				} else {
					nodeRef['value'] = data[name] || '';
				}
			}
		}
	};

	return {
		values: state.values,
		errors: state.errors,
		sanity: state.sanity,
		form,
		submit,
		onsubmit,
		reset
	};
};
export default microform;
