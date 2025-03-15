import { type Writable } from "svelte/store";
import type { Params } from "./internal.js";

export type Validator = `max:${number}` | `min:${number}` | `len:${number}` | `minlen:${number}` | `maxlen:${number}` | `file-size-mb:${number}` | `match:${string}` | 'required' | 'email' | 'integer' | 'number' | 'alpha' | 'alphanum' | 'url' | 'ip';
export type ValidatorKey = 'required' | 'email' | 'integer' | 'number' | 'alpha' | 'alphanum' | 'url' | 'ip' | `max` | `min` | `len` | `minlen` | `maxlen` | `file-size-mb` | `match`;

export type FieldProps = {
	name: string;
	value: string;
	label: string;
	node?: HTMLElement;
	values: Params;
	parts?: string[];
}
export type ValidatorType = (props: FieldProps) => string;
export type ValidatorMap<T> = { [VAL in ValidatorKey]: T };
export type InputTypes = 'text' | 'number' | 'color' | 'time' | 'date' | 'range' | 'email' | 'hidden' | 'password' | 'tel' | 'url';
export type FieldType = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
export type InputType = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

export interface ValidateArgs {
	name: string;
	value: string;
	validations?: Validator[];
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
	validations?: Validator[];
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
	validateEvent?: ValidateEvent;
	validators?: Partial<ValidatorMap<ValidatorType>>;
}

export type MicroFormProps = {
	data?: Params;
	options?: FormOptions
}
export type FormSanity = {
	ok: boolean;
};
export type MicroFormReturn = {
	values: FormValues;
	errors: FormErrors;
	sanity: FormSanity;
	form: (node: HTMLElement, eventProps?: ActionOptions) => FormReturn;
	submit: (formNode: HTMLFormElement, handler: FormSubmit) => void;
	onsubmit: (handler: FormSubmit) => (e: Event) => Promise<void>;
	reset: () => void;
}
export type Microform = (props?: MicroFormProps) => MicroFormReturn;
