import { isNil } from 'lodash';

export class Mergeable {
    constructor(values = {}) {
        this.setValues(values);
    }

    updateValues = (values = {}) => {
        const deltas = this.deltaValues(values);
        for (const [key, value] of Object.entries(deltas)) {
            this[key] = value[1];
        }
        return deltas;
    };

    deltaValues = (values = {}) => {
        const deltas = {};
        for (const key of Object.keys(this)) {
            if (Object.hasOwn(values, key)) {
                // Define comparator
                let eq = (a, b) => a === b;
                if (this[key] instanceof Date) {
                    eq = (a, b) => (isNil(a) && isNil(b)) || (isNil(a) === isNil(b) && a.valueOf() === b.valueOf());
                }

                if (!eq(this[key], values[key])) {
                    deltas[key] = [this[key], values[key]];
                }
            }
        }
        return deltas;
    };

    setValues = (values = {}) => {
        for (const key of Object.keys(this)) {
            if (Object.hasOwn(values, key)) {
                if (typeof this[key] !== 'function') {
                    this[key] = values[key];
                }
            }
        }
    };
}
