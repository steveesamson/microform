import type { FormValues, FormErrors, FormSanity } from "./types.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Params<T = any> = {
	[key: string | number | symbol]: T;
};

export type Primitive = string | number | boolean | string[] | number[] | boolean[];

export type FormState = {
	values: FormValues;
	errors: FormErrors;
	sanity: FormSanity;
	unfits: FormErrors;
	// validationMap: Params;
	// submit: (formNode: HTMLFormElement, handler: FormSubmit) => void;
	// onsubmit: (handler: FormSubmit) => (e: Event) => Promise<void>;
	// reset: () => void;
	// updateSanity: (isOk: boolean) => void;
}

export const formState = (data: Params): FormState => {
	// form values
	const values: FormValues = $state<FormValues>({ ...data });
	// external form errors
	const errors: FormErrors = $state<FormValues>({});
	const sanity = $state<FormSanity>({ ok: false });

	// internal checks
	const unfits: FormErrors = $state<FormValues>({});


	// const validationMap: Params = {};


	// const updateSanity = (isOk: boolean) => {
	// 	sanity.ok = isOk;
	// };

	// const handleSubmit = (e: Event, handler: FormSubmit) => {
	// 	e.preventDefault();
	// 	if (!sanity.ok) return;

	// 	handler({ ...values });
	// };

	// const onsubmit = (handler: FormSubmit) => {
	// 	const onSubmit = async (e: Event) => {
	// 		handleSubmit(e, handler);
	// 	};
	// 	return onSubmit;
	// };

	// const submit = (formNode: HTMLFormElement, handler: FormSubmit) => {
	// 	formNode.addEventListener('submit', (e: SubmitEvent) => {
	// 		handleSubmit(e, handler);
	// 	});
	// };

	// const reset = () => {
	// 	const defaultKeys = Object.keys({ ...data });
	// 	for (const [key,] of Object.entries(values)) {
	// 		if (defaultKeys.includes(key)) {
	// 			values[key] = data[key];
	// 		} else {
	// 			delete values[key];
	// 		}
	// 	}
	// 	errors = {};
	// 	unfits = {};
	// 	sanity.ok = false;

	// 	for (const [name, { nodeRef, html }] of Object.entries(validationMap).filter(
	// 		([, { nodeRef }]: [string, Params]) => !!nodeRef
	// 	)) {
	// 		if (nodeRef) {
	// 			if (nodeRef.isContentEditable) {
	// 				nodeRef[html ? 'innerHTML' : 'textContent'] = data[name] || '';
	// 			} else {
	// 				nodeRef['value'] = data[name] || '';
	// 			}
	// 		}
	// 	}
	// };


	return {
		values,
		errors,
		sanity,
		unfits,
		// reset,
		// validationMap
	}
}