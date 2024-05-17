import { type Writable, type Readable } from "svelte/store";
import type { Params } from "./internal.js";
export type { Params };

export type FieldTypes = "Standard" | "Popover" | "Checkable";
export type InputTypes = 'text' | 'number' | 'color' | 'time' | 'date' | 'range' | 'email' | 'hidden' | 'password' | 'tel' | 'url';
export type FieldType = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
export type InputType = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
export interface ValidateArgs {
	name: string;
	value: string;
	validations: string;
	node?: HTMLElement;
}
export type FormReturn = {
	destroy: () => void
};

export type ValidateEvent = 'input' | 'change' | 'keyup' | 'blur';

export type FormValues = Params;
export type FormErrors = Params;
export type Dirty = Writable<boolean>;

export type ActionOptions = {
	validateEvent?: ValidateEvent;
	name?: string;
	validations?: string;
	node?: HTMLElement;
	html?: boolean;
}

export type FormAction = (
	node: HTMLElement,
	eventProps?: ActionOptions
) => FormReturn

export type FormSubmitEvent = SubmitEvent & {
	currentTarget: EventTarget & HTMLFormElement;
}
export type FormSubmit = (_data: Params) => void;

export type FormOptions = {
	validateEvent: ValidateEvent;
}

export type MicroFormProps = {
	data?: Params;
	options?: FormOptions
}
export type FormSanity = {
	ok:boolean;
};
export type MicroFormReturn = {
	values: FormValues;
	errors: FormErrors;
	form: (node: HTMLElement, eventProps?: ActionOptions) => FormReturn;
	sanity: FormSanity;
	submit: (formNode: HTMLFormElement, handler: FormSubmit) => void;
	onsubmit: (handler: FormSubmit) => (e: Event) => Promise<void>;
	reset: () => void;
}

