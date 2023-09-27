import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TaskContext } from "./TaskContext";
import { isNil } from "lodash";

const _taskStorageKey = "tasks_store";

const displayOrderSort = (a, b) => a.displayOrder - b.displayOrder;

/**
 *
 * @param {Object} props
 * @param {[]Componenet} props.children
 * @returns
 */
export default function TaskProvider({ children = [] }) {
    const [tasksByList, setTasksByList] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showCompleted, setShowCompleted] = useState(false);

    // Load the lists on initial render
    useEffect(() => {
        const loadedTasks = JSON.parse(localStorage.getItem(_taskStorageKey));

        // Sanity Check
        if (isNil(loadedTasks)) {
            return;
        }

        setTasksByList(loadedTasks);
        setIsLoading(false);
    }, []);

    /**
     * Return all Tasks that belong to the provided List
     * @param {string} listId
     * @returns
     */
    const getByListId = (listId) =>
        isNil(tasksByList[listId]) ? [] : tasksByList[listId];

    /**
     * Adds the new task
     * @param {Task} newTask
     */
    const addTask = (newTask) => {
        const res = { ...tasksByList };

        if (isNil(res[newTask.listId])) {
            res[newTask.listId] = [];
        }

        // Automatically put the task at the end
        newTask.displayOrder = res[newTask.listId].length;

        // Add the Task
        res[newTask.listId].push(newTask);

        // Sort the list
        res[newTask.listId].sort(displayOrderSort);

        // Store the data
        localStorage.setItem(_taskStorageKey, JSON.stringify(res));
        setTasksByList(res);
    };

    /**
     * Update the target task with the new Task data
     * @param {Task} task 
     */
    const updateTask = (task) => {
        const res = { ...tasksByList };

        // Find the element
        const set = res[task.listId];
        const index = set.findIndex((elem) => elem.id === task.id);

        // Update the element
        if (index > -1) {
            set[index] = task;
        }

        // Store the data
        localStorage.setItem(_taskStorageKey, JSON.stringify(res));
        setTasksByList(res);
    };

    const contextValue = {
        isLoading,
        getByListId,
        addTask,
        updateTask,
        showCompleted,
        setShowCompleted
    };

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
}
TaskProvider.propTypes = {
    children: PropTypes.object,
};
