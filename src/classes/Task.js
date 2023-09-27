import IdClass from "./IdClass";

export default class Task extends IdClass {
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
