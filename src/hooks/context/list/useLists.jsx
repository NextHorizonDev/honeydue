import { useContext } from "react";
import { ListContext } from "./ListContext";

/**
 * Context hook for accessing List data
 * @returns []List
 */
export default function useLists() {
    return useContext(ListContext);
}