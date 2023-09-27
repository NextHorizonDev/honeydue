import MetaClass from "./MetaClass";

export default class Task extends MetaClass {
    listId = null;

    name = "";

    status = TaskStatus.ACTIVE;

    displayOrder = 0;

    constructor(values) {
        super(values);
        this.setValues(values);
    }
}

export const TaskStatus = {
    ACTIVE: "active",
    COMPLETED: "completed",
};
