import { Mergeable } from "../@nhd/common-shared/classes/mergeable";
import { v4 } from "uuid";

export default class IdClass extends Mergeable {
    id = v4();

    constructor(values) {
        super(values);
        this.setValues(values);
        console.warn(
            "Id creation needs to be replaced with crypto in production"
        );
    }
}
