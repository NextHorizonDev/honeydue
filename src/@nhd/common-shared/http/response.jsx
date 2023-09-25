import { Mergeable } from '../classes/mergeable';

/**
 * Contains the status and status messages for a HTTP response
 *
 * @class NHDResponseStatus
 * @extends {Mergeable}
 */
export class NHDResponseStatus extends Mergeable {
    /**
     * The HTTP status code of the response
     * @type Number
     * @memberof NHDResponseStatus
     */
    code = 200;

    /**
     * The string status of the response
     * @type string
     * @memberof NHDResponseStatus
     */
    status = '';

    /**
     * The string message to the client
     * @type string
     * @memberof NHDResponseStatus
     */
    message = '';

    /**
     * The string message to the client
     * @type string
     * @memberof NHDResponseStatus
     */
    detailedMessage;

    constructor(values = {}) {
        super();
        this.setValues(values);
    }
}

/**
 * Contains the meta data for an http response
 *
 * @class NHDResponseMeta
 * @extends {Mergeable}
 */
export class NHDResponseMeta extends Mergeable {
    /**
     * The unique request identifier
     * @type uuid
     * @memberof NHDResponseMeta
     */
    requestId = '';

    /**
     * The number of milliseconds that the request took to execute on the server
     * @type Number | Date
     * @memberof NHDResponseMeta
     */
    elapsedTime = -1;

    getTime = () => {
        return 100;
    };

    constructor(values = {}) {
        super();
        this.setValues(values);
    }
}

/**
 * Stores a standard body for an HTTP response body
 *
 * @class NHDResponseBody
 * @extends {Mergeable}
 */
export class NHDResponseBody extends Mergeable {
    /**
     * The Status of the response
     * @type NHDResponseStatus
     * @memberof NHDResponseBody
     */
    status = new NHDResponseStatus();
    /**
     * The data that will be sent back to the client. This will usually be JSON, but can be anything.
     *
     * Note that if this is JSON, it will be packaged within a JSON object that has more properties.
     * @type *
     * @memberof NHDResponseBody
     */
    data = null;

    /**
     * The meta values of the response
     * @type NHDResponseMeta
     * @memberof NHDResponseBody
     */
    meta = new NHDResponseMeta();

    /**
     * Any data to send back to the client pertaining to authentication
     * @type Object<string,string>
     * @memberof NHDResponseBody
     */
    auth = null;

    static async fromResponse(response) {
        try {
            const body = await response.json();

            const responseBodyContents = {
                status: new NHDResponseStatus(body.status),
                data: body.data,
                meta: new NHDResponseMeta(body.meta)
            };

            if (body.auth !== null) {
                responseBodyContents.auth = body.auth;
            }

            const nhdResp = new NHDResponseBody(responseBodyContents);

            return nhdResp;
        } catch (e) {
            console.error(`failed to parse response: e.message`);
            console.error(e.stack);

            throw e;
        }
    }

    constructor(values = {}) {
        super();
        this.setValues(values);
    }
}
