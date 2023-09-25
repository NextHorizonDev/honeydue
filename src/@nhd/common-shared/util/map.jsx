import { isNil } from 'lodash';

export function toMap(arr, func) {
    const result = {};

    for (let i = 0; i < arr.length; i++) {
        result[func(arr[i])] = arr[i];
    }

    return result;
}

export function toMapArray(arr, func) {
    const result = {};

    for (let i = 0; i < arr.length; i++) {
        const key = func(arr[i]);
        // Ensure the field exists
        if (isNil(result[key])) {
            result[key] = [];
        }

        result[key].push(arr[i]);
    }

    return result;
}

export function toIdMap(arr) {
    return toMap(arr, (elem) => elem.id);
}
