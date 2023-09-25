import Joi from 'joi';
import { Mergeable } from '../classes/mergeable';

export class NHDRequestBody extends Mergeable {
    /**
     * The body parameters sent by the client
     * @type {Object<string, *>}
     * @memberof NHDRequestBody
     */
    payload = {};

    constructor(values = {}) {
        super();
        this.setValues(values);

        // Check the schema against what was provided
        // Note: Because of where we are in the context, I can't throw a real error.
        //       This should never happen outside of development, anyways.
        try {
            Joi.attempt(values, this.constructor.joiSchema());
        } catch (e) {
            console.error(`NHDRequestBody received bad format: ${e.message}`);
            throw e;
        }
    }

    /**
     * In order to verify what was sent in
     * @static
     * @return {Joi.object}
     * @memberof NHDRequestBody
     */
    static joiSchema() {
        return Joi.object({
            payload: Joi.object().unknown().required()
        });
    }
}
