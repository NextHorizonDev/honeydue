import { Mergeable } from "../@nhd/common-shared/classes/mergeable";
import { v4 } from "uuid";

export default class List extends Mergeable {
    id = v4();

    name = "";

    status = ListStatus.ACTIVE;

    constructor(values) {
        super(values);
        this.setValues(values);
        console.warn(
            "Id creation needs to be replaced with crypto in production"
        );
    }
}

export const ListStatus = {
    ACTIVE: "active",
    ARCHIVED: "archived",
};
