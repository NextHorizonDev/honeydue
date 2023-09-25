import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { useRef, useState } from "react";
import useLists from "../../hooks/context/list/useLists";
import List from "../../classes/List";

export default function AddListInput() {
    // Hooks
    const { addList } = useLists();

    // Variables
    const inputElem = useRef(null);
    const [name, setName] = useState("");

    /**
     * Add a new list with the provided name
     */
    const onAdd = () => {

        // Trim to prevent odd errors with edged whitespace
        const trimmed = name.trim()

        // Sanity check
        if (trimmed.length === 0) {
            return;
        }

        addList(new List({
            name: trimmed,
        }));

        // Clear the value back to nothing
        setName("");

        // Remove focus
        inputElem.current.blur();
    };

    return (
        <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>Create New List</InputLabel>
            <OutlinedInput
                size="small"
                ref={inputElem}
                value={name}
                onChange={(e) => setName(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton size="small" onClick={() => onAdd()}>
                            <FontAwesomeIcon icon={faPlus} />
                        </IconButton>
                    </InputAdornment>
                }
                label="Create New List"
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        onAdd();
                    }
                }}
            />
        </FormControl>
    );
}
