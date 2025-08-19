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
}

export const formState = (data: Params): FormState => {
	// form values
	const values: FormValues = $state<FormValues>({ ...data });
	// external form errors
	const errors: FormErrors = $state<FormValues>({});
	const sanity = $state<FormSanity>({ ok: false });

	// internal checks
	const unfits: FormErrors = $state<FormValues>({});

	return {
		values,
		errors,
		sanity,
		unfits,
	}
}