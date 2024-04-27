export * from "./types.js";
import { writable, derived, get } from 'svelte/store';
import { formAction } from './form-action.js';
import type { FormErrors, FormSubmit, FormValues, MicroFormProps, MicroFormReturn } from './types.js';
import type { Params } from './internal.js';

const useForm = (props?: MicroFormProps): MicroFormReturn => {
    // form default values
    const data = props?.data || {};
    // form values
    const values: FormValues = writable<Params>(data);
    // internal checks
    const unfits = writable<Params>({});
    // external form errors
    const errors: FormErrors = writable<Params>({});
    const isdirty = writable<boolean>(false);

    const isclean = derived(([errors, unfits]), ([$errors, $unfits]) => {
        const errVals = Object.values($errors);
        const unfitVals = Object.values($unfits);
        return (errVals.length === 0 || errVals.reduce((comm: boolean, next: string | undefined) => comm && !next, true))
            && (unfitVals.length === 0 || unfitVals.reduce((comm: boolean, next: string | undefined) => comm && !next, true));
    })
    const valid = derived(([isclean, isdirty]), ([$isclean, $isdirty]) => {
        return $isclean && $isdirty;
    })
    const validationMap: Params = {};
    const {
        options = {
            validateEvent: 'blur'
        }
    } = props || {};

    const form = formAction(values, errors, unfits, isdirty, options, validationMap);

    const handleSubmit = (e: Event, handler: FormSubmit) => {
        e.preventDefault();
        if (!get(valid)) return;

        handler({ ...get(values) });
    }

    const onsubmit = (handler: FormSubmit) => {

        const onSubmit = async (e: Event) => {
            handleSubmit(e, handler);
        };
        return onSubmit;
    };
    const submit = (formNode: HTMLFormElement, handler: FormSubmit) => {
        formNode.addEventListener('submit', (e: SubmitEvent) => {
            handleSubmit(e, handler);
        })
    };

    const reset = () => {
        errors.set({});
        unfits.set({});
        values.set({ ...data });
        for (const [name, { nodeRef, html }] of Object.entries(validationMap).filter(([, { nodeRef }]: [string, Params]) => !!nodeRef)) {
            if (nodeRef) {
                nodeRef[html ? "innerHTML" : 'textContent'] = data[name] || '';
            }
        }
    };

    return {
        values,
        errors,
        valid,
        form,
        submit,
        onsubmit,
        reset,
    }
};

export default useForm;
