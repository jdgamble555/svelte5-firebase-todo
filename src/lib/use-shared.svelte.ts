import { getContext, hasContext, setContext } from "svelte";
import { readable, writable } from "svelte/store";
import { rune } from "./rune.svelte";

export const useSharedStore = <T, A>(
    name: string,
    fn: (value?: A) => T,
    defaultValue?: A,
) => {
    if (hasContext(name)) {
        return getContext<T>(name);
    }
    const _value = fn(defaultValue);
    setContext(name, _value);
    return _value;
};

// writable store context
export const useWritable = <T>(name: string, value?: T) =>
    useSharedStore(name, writable, value);

// readable store context
export const useReadable = <T>(name: string, value: T) =>
    useSharedStore(name, readable, value);

// shared rune
export const useRune = <T>(name: string, value: T) =>
    useSharedStore(name, rune, value);