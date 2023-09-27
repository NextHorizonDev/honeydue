import { createContext } from "react";

/**
 * Context Hook for accessing Tasks
 */
export const TaskContext = createContext({
    isLoading: false,
    getByListId: () => console.warn("no getByListId defined"),
    addTask: () => console.warn("no addTask defined")
});