import { type Writable, get } from "svelte/store";
import { useValidator } from "./form-validators.js";
import { getEditableContent } from "./utils.js";
import type {
    ActionOptions,
    FieldType,
    FormErrors,
    FormOptions,
    FormValues,
    InputType,
    FormReturn,
    Params,
    FormAction
} from "./types.js";


const isField = (node: unknown): node is FieldType => {
    return node instanceof HTMLSelectElement ||
        node instanceof HTMLInputElement ||
        node instanceof HTMLTextAreaElement;
}
const isExcluded = (node: unknown) => {
    return node instanceof HTMLInputElement && ['radio', 'checkbox', 'file'].includes(node.type.toLowerCase());
}

const checkFormFitness = (values: FormValues, unfits: Writable<Params>, validationMap: Params) => {
    const validate = useValidator(unfits, values);
    const _values = get(values);
    for (const [name, { validations }] of Object.entries(validationMap)) {
        validate({ name, value: _values[name], validations, });
    }
}

export const formAction = (values: FormValues, errors: FormErrors, unfits: Writable<Params>, isdirty: Writable<boolean>, options: FormOptions, validationMap: Params): FormAction => {
    const validate = useValidator(errors, values);

    return (node: HTMLElement, eventProps?: ActionOptions): FormReturn => {
        const nodeName = isField(node) ? node.name : ''
        const { name: dsname = nodeName, validations: dsvalidations = '' } = node.dataset || {};
        const { name = dsname, validations = dsvalidations, validateEvent = options.validateEvent, html = false } = eventProps || {};
        validationMap[name] = { validations, html, nodeRef: isField(node) ? false : node };

        const storedValue = get(values)[name] || '';
        let defValue = storedValue;

        if (isField(node) && !isExcluded(node)) {

            defValue = node.value || storedValue;
            node.value = defValue;
        } else if (node.isContentEditable) {
            defValue = node.innerHTML || storedValue;
            node.innerHTML = defValue;
        }

        values.update((data: Params) => {
            return { ...data, [name]: defValue };
        });

        let unsubscribe: () => void;

        const updateNode = (e: Event) => {
            if (!unsubscribe) {
                unsubscribe = values.subscribe((data: Params) => {
                    validate({ name, value: data[name], validations, node });
                });
            }

            if (isField(node) && !isExcluded(node)) {
                const value = (e.target as InputType).value || '';
                values.update((data: Params) => {
                    return { ...data, [name]: value };
                });

            } else if (node.isContentEditable) {
                const { value: htm, text } = getEditableContent({ target: node }, html);
                values.update((data: Params) => {
                    return { ...data, [name]: htm, [`${name}-text`]: text };
                });
            }

            checkFormFitness(values, unfits, validationMap);
            isdirty.set(true);

        }
        node.addEventListener(validateEvent, updateNode);

        return {
            destroy() {
                unsubscribe?.();
                node.removeEventListener(validateEvent, updateNode);
            }
        };
    }

}
