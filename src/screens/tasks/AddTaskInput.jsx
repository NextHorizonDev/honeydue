import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import useTasks from "../../hooks/context/task/useTasks";
import Task, { TaskStatus } from "../../classes/Task";

export default function AddTaskInput({
    listId = null
}) {

    // Helper hooks
    const { addTask } = useTasks();

    // Whether or not we are showing the active or passive state
    const [showInput, setShowInput] = useState(false);

    /**
     * Saves a new Task with the provided name
     * @param {string} name 
     */
    const saveTask = (name) => {
        addTask(new Task({
            listId: listId,
            name: name,
            status: TaskStatus.ACTIVE
        }));
        setShowInput(false);
    };

    return (
        <Box className="add-task-input">
            {showInput ? (
                <ActiveAddTaskContent onSubmitted={(name) => saveTask(name)} />
            ) : (
                <PassiveAddTaskContent onClick={() => setShowInput(true)} />
            )}
        </Box>
    );
}
AddTaskInput.propTypes = {
    listId: PropTypes.string
}


function ActiveAddTaskContent({
    onSubmitted = () => console.warn("no onSubmitted defined"),
}) {
    const [name, setName] = useState("");

    return (
        <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    onSubmitted(name);
                }
            }}
            className="active-add-task-content"
            size="small"
            fullWidth
        />
    );
}
ActiveAddTaskContent.propTypes = {
    onSubmitted: PropTypes.func
}

function PassiveAddTaskContent(props) {
    return (
        <Box {...props} className="passive-add-task-content">
            <Box className="add-task-input-title">Add Task</Box>
            <Box className="add-task-input-icon">
                <FontAwesomeIcon icon={faPlus} />
            </Box>
        </Box>
    );
}
