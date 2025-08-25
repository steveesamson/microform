import { formAction } from './form-action.svelte.js';
import type {
	FormSubmit,
	Microform,
	MicroFormProps,
	MicroFormReturn,
	ValidatorMap,
	ValidatorType
} from './types.js';
import { formState, type Params } from './internal.svelte.js';
import { resetObject } from './utils.js';

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

	const form = formAction(state.values, state.errors, state.unfits, state.sanity, options, validationMap);

	const handleSubmit = (e: Event, handler: FormSubmit) => {
		e.preventDefault();
		if (!state.sanity.ok) return;

		handler({ ...state.values });
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

	const reset = () => {
		resetObject(state.values, data);
		resetObject(state.errors);
		resetObject(state.unfits);
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
