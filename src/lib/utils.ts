import type { Readable, Writable } from "svelte/store";
import type { Params, Primitive } from "./internal.js";

type TEvent = {
    target: HTMLElement;
}
export const getEditableContent = (e: TEvent, isHtml: boolean) => {
    const el = e.target;
    const text = el.textContent?.trim() || "";
    if (!isHtml) {
        return { text, value: text };
    }
    let htm = el.innerHTML;
    htm = htm.trim();
    htm = htm.replace(/<br>/g, "");
    htm = htm.replace(/<div><\/div>/g, "");
    htm = htm.replace(/<p><\/p>/g, "");
    htm = htm.replace(/<div>/g, "<p>");
    htm = htm.replace(/<\/div>/g, "</p>");
    htm = htm.trim()
        ? htm.indexOf("<p>") === -1
            ? `<p>${htm}</p>`
            : htm
        : htm;

    return { value: htm.trim(), text };
}

export const makeName = function (str: string) {
    const index = str.indexOf('_');
    if (index < 0) {
        return str === 'id' ? str.toUpperCase() : str.charAt(0).toUpperCase() + str.substring(1);
    }
    const names = str.split('_');
    let new_name = '';

    names.forEach(function (s) {
        new_name += new_name.length > 0 ? ' ' + makeName(s) : makeName(s);
    });

    return new_name;
};


export const bindStateToStore = (state: Params, store: Writable<Params>): void => {
    store.subscribe((changes: Params) => {
        for (const [k, v] of Object.entries(changes)) {
            state[k] = v;
        }
    })
}
