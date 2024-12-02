export function preventDefault<T extends Event>(
    fn: (event: T) => void
) {
    return function (this: unknown, event: T): void {
        event.preventDefault();
        fn.call(this, event);
    };
}