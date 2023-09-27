import { useContext } from "react";
import { TaskContext } from "./TaskContext";

/**
 * Context hook for accessing Task data
 * @returns []Task
 */
export default function useTasks() {
    return useContext(TaskContext);
}