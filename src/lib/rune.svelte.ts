export const rune = <T>(initialValue: T) => {
    const _rune = $state({ value: initialValue });
    return _rune;
};