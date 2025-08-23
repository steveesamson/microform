import type { FormValues, FormErrors, FormSanity } from "./types.js";
import { resetObject } from "./utils.js";

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

}
export type FormStore = FormState & {
	validationMap: Params;
	reset: () => void;
}
export const formStore = (data: Params): FormStore => {

	const validationMap: Params = {};
	// form state
	const state: FormValues = $state<FormState>({
		values: { ...data },
		errors: {},
		unfits: {},
		sanity: { ok: false }
	});

	return {
		validationMap,
		get values() {
			return state.values;
		},
		get errors() {
			return state.errors;
		},
		get unfits() {
			return state.unfits;
		},
		get sanity() {
			return state.sanity;
		},
		reset() {
			resetObject(state.values, data);
			resetObject(state.errors);
			resetObject(state.unfits);
			state.sanity.ok = false;
			const nodeEntries = Object.entries(validationMap).filter(([, { nodeRef }]: [string, Params]) => !!nodeRef);
			for (const [name, { nodeRef, html }] of nodeEntries) {
				if (nodeRef) {
					if (nodeRef.isContentEditable) {
						nodeRef[html ? 'innerHTML' : 'textContent'] = data[name] || '';
					} else {
						nodeRef['value'] = data[name] || '';
					}
				}
			}
		}
	}
}