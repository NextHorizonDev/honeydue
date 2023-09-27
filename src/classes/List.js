import MetaClass from "./MetaClass";

export default class List extends MetaClass {
    name = "";

    status = ListStatus.ACTIVE;

    constructor(values) {
        super(values);
        this.setValues(values);
    }
}

export const ListStatus = {
    ACTIVE: "active",
    ARCHIVED: "archived",
};
