import IdClass from "./IdClass";

export default class List extends IdClass {
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
