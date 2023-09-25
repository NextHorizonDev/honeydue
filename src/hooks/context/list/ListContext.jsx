import { createContext } from "react";

/**
 * Context Hook for storing Lists
 */
export const ListContext = createContext({
    isLoading: false,
    lists: [],
    addList: () => console.warn("no addList defined"),
    updateList: () => console.warn("no updateList defined"),
    deleteList: () => console.warn("no deleteList defined")
});