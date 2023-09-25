import { useEffect, useState } from "react";
import { ListContext } from "./ListContext";
import PropTypes from "prop-types";
import { isNil } from "lodash";

const _listStorageKey = "lists_store";

const alphaSort = (a, b) => a.name.localeCompare(b.name);

/**
 *
 * @param {Object} props
 * @param {[]Componenet} props.children
 * @returns
 */
export default function ListProvider({ children = [] }) {
    const [lists, setLists] = useState([]);
    const [activeList, setActiveList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load the lists on initial render
    useEffect(() => {
        const loadedLists = JSON.parse(localStorage.getItem(_listStorageKey));
        loadedLists.sort(alphaSort);
        setLists(loadedLists);
        setIsLoading(false);
    }, []);

    /**
     * Add a new List to the lists
     * @param {List} newList
     */
    const addList = (newList) => {
        // Sanity check
        if (isNil(newList)) {
            console.error(`cannot add ${newList} as a new List`);
            return;
        }

        // Ensure there is an id
        

        const res = [...lists];
        res.push(newList);
        res.sort(alphaSort); // Sort the list alphabetically

        // Update storage
        localStorage.setItem(_listStorageKey, JSON.stringify(res));

        // Append the new List
        setLists(res);
    };

    /**
     * Update the List in the set
     * @param {string} targetList
     */
    const updateList = (targetList) => {
        // Update the List
        const res = [...lists];
        const index = res.findIndex((elem) => elem.id === targetList.id);
        if (index > -1) {
            res[index] = targetList;
        }

        // Update storage
        localStorage.setItem(_listStorageKey, JSON.stringify(res));

        // Update the Lists
        setLists(res);
    };

    /**
     * Delete the List
     * @param {string} id
     */
    const deleteList = (id) => {
        // Remove the List
        const res = [...lists];
        const index = res.findIndex((elem) => elem.id === id);
        if (index > -1) {
            res.splice(index, 1);
        }

        // Update storage
        localStorage.setItem(_listStorageKey, JSON.stringify(res));

        // Update the Lists
        setLists(res);
    };

    const contextValue = {
        isLoading,
        lists,
        activeList,
        setActiveList,
        addList,
        updateList,
        deleteList,
    };

    return (
        <ListContext.Provider value={contextValue}>
            {children}
        </ListContext.Provider>
    );
}
ListProvider.propTypes = {
    children: PropTypes.object,
};
