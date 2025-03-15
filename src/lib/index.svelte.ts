import { writable, derived, get } from 'svelte/store';
import { formAction } from './form-action.js';
import type { FormErrors, FormSanity, FormSubmit, FormValues, Microform, MicroFormProps, MicroFormReturn, ValidatorMap, ValidatorType } from './types.js';
import type { Params } from './internal.js';
import { bindStateToStore } from "./utils.js";

const microform: Microform = (props?: MicroFormProps): MicroFormReturn => {
    // form default values
    const data = props?.data || {};
    // form values
    const _values = writable<Params>({ ...data });
    // internal checks
    const unfits = writable<Params>({});
    // external form errors
    const _errors = writable<Params>({});
    const isdirty = writable<boolean>(false);

    const isclean = derived(([_errors, unfits]), ([$errors, $unfits]) => {
        const errVals = Object.values($errors);
        const unfitVals = Object.values($unfits);
        return (errVals.length === 0 || errVals.reduce((comm: boolean, next: string | undefined) => comm && !next, true))
            && (unfitVals.length === 0 || unfitVals.reduce((comm: boolean, next: string | undefined) => comm && !next, true));
    })

    const _valid = derived(([isclean, isdirty]), ([$isclean, $isdirty]) => {
        return $isclean && $isdirty;
    })

    const validationMap: Params = {};
    const {
        options = {
            validateEvent: 'blur',
            validators: {} as ValidatorMap<ValidatorType>
        }
    } = props || {};

    const form = formAction(_values, _errors, unfits, isdirty, options, validationMap);

    const handleSubmit = (e: Event, handler: FormSubmit) => {
        e.preventDefault();
        if (!get(_valid)) return;

        handler({ ...get(_values) });
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
        _errors.set({});
        unfits.set({});
        _values.set({ ...data });
        isdirty.set(false);
        for (const [name, { nodeRef, html }] of Object.entries(validationMap).filter(([, { nodeRef }]: [string, Params]) => !!nodeRef)) {
            if (nodeRef) {
                if (nodeRef.isContentEditable) {
                    nodeRef[html ? "innerHTML" : 'textContent'] = data[name] || '';
                } else {
                    nodeRef["value"] = data[name] || '';
                }
            }
        }
    };

    const values: FormValues = $state<FormValues>({ ...data });
    const errors: FormErrors = $state<FormValues>({});
    const sanity: FormSanity = $state<FormSanity>({ ok: get(_valid) });

    bindStateToStore(values, _values);
    bindStateToStore(errors, _errors);
    _valid.subscribe((changes: boolean) => {
        sanity.ok = changes;
    });

    return {
        values,
        errors,
        sanity,
        form,
        submit,
        onsubmit,
        reset,
    };
};
export default microform;