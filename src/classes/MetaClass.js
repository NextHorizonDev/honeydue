import IdClass from "./IdClass";

export default class MetaClass extends IdClass {
    createdAt = new Date();

    updatedAt = new Date();

    updateValues = (newValues) => {
        console.log("NEW: ", newValues);

        this.setValues(newValues);
        this.updatedAt = new Date();
    };

    constructor(values) {
        super(values);
        this.setValues(values);
    }
}
