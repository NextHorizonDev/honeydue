import { Box } from "@mui/material";
import PropTypes from "prop-types";
import useTasks from "../../hooks/context/task/useTasks";
import { useMemo } from "react";
import AddTaskInput from "./AddTaskInput";
import NoResults from "../../util/NoResults";
import useLists from "../../hooks/context/list/useLists";
import TaskListItem from "./TaskListItem";

export default function TaskList({ listId = null }) {
    const { activeList } = useLists();
    const { getByListId } = useTasks();

    const tasks = useMemo(() => {
        return getByListId(listId);
    }, [getByListId, listId]);

    return (
        <Box>
            <Box>
                {tasks.map((task) => (
                    <TaskListItem key={task.id} task={task} />
                ))}
                {tasks.length === 0 && <NoResults title={"No Tasks"} />}
            </Box>
            <AddTaskInput listId={activeList?.id}/>
        </Box>
    );
}
TaskList.propTypes = {
    listId: PropTypes.string,
};