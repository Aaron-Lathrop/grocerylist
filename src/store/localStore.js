import { withTimestamp } from "../services/db";
import { writable } from "svelte/store";

const toString = obj => JSON.stringify(obj);
const toObj = json => json && JSON.parse(json);

export default function localStore(key, initial) {
    const setItem = value => {
        if (Array.isArray(value)) {
            return localStorage.setItem(
                key,
                toString(value.map(withTimestamp))
            );
        }
        else if (typeof value == 'object') {
            return localStorage.setItem(
                key, 
                toString(withTimestamp(value))
            );
        }
        return localStorage.setItem(value);
    };
    const { subscribe, set, update } = writable(initial);

    const localItem = localStorage.getItem(key);
    update(value => {
        if (!localItem && value) {
            setItem(value);
        } else if (localItem) {
            return toObj(localItem);
        }
        return value;
    });

    return {
        subscribe,
        set: value => {
            setItem(value);
            return set(value);
        },
        update: fn => {
            return update(value => {
                const newValue = fn(value);
                setItem(newValue);
                return newValue;
            });
        },
        value: () => {
            let currentValue;
            update(val => currentValue = val);
            return currentValue;
        }
    };
}