import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import { isNil } from "lodash";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { TaskStatus } from "../../classes/Task";
import useTasks from "../../hooks/context/task/useTasks";

export default function TaskListItem({ task = null }) {

    const { showCompleted } = useTasks();

    // Sanity Check
    if (isNil(task) || (!showCompleted && task.status === TaskStatus.COMPLETED)) {
        return null;
    }

    return (
        <Box className="task">
            <TaskListCheckbox task={task} />
            <Box className="task-name">{task.name}</Box>
        </Box>
    );
}
TaskListItem.propTypes = {
    task: PropTypes.object,
};

function TaskListCheckbox({ task = null }) {

    // Helper Hooks
    const { updateTask } = useTasks();

    const [isHighlighted, setIsHighlighted] = useState(false);

    const icon = useMemo(() => {
        // Sanity Check
        if (isNil(task)) {
            return "";
        }

        if (task.status === TaskStatus.ACTIVE) {
            return isHighlighted ? faCheckSquare : faSquare;
        }
        if (task.status === TaskStatus.COMPLETED) {
            return isHighlighted ? faSquare : faCheckSquare;
        }

        console.error("unknown task status: ", task.status);
        return "";
    }, [task, isHighlighted]);

    /**
     * Invert the status of the Task
     */
    const toggleTaskStatus = () => {
        task.status = task.status === TaskStatus.ACTIVE ? TaskStatus.COMPLETED : TaskStatus.ACTIVE;
        updateTask(task);
    }

    return (
        <Box
            className="task-checkbox"
            onMouseEnter={() => setIsHighlighted(true)}
            onMouseLeave={() => setIsHighlighted(false)}
            onClick={() => toggleTaskStatus()}
        >
            <FontAwesomeIcon icon={icon} />
        </Box>
    );
}
TaskListCheckbox.propTypes = {
    task: PropTypes.object,
};
