/**
 * Converts PascalCase & kebab-case string to camelCase.
 * @param value the value to convert.
 * @returns The resulting camelcase string.
 */
export function toCamelCase(value: string) {
    return value.includes('-')
        ? value.replace(/-./g, x => x.toUpperCase()[1]) // from kebab-case
        : value[0].toLowerCase() + value.slice(1); // from PascalCase (by default...)
}

/**
 * Converts camelCase string to Pascal case.
 * @param value the value to convert.
 * @returns The resulting PascalCase string.
 */
export function toPascalCase(value: string) {
    return value[0].toUpperCase() + value.slice(1);
}

/**
 * Converts PascalCase & camelCase string to kebab-case.
 * @param value The input value to convert.
 * @returns The resulting kebab-case string.
 */
export function toKebabCase(value: string) {
    return value[0].toLowerCase() + value.slice(1)
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
        .toLowerCase();
}

export function toInt(value: string){
    return parseInt(value);
}
