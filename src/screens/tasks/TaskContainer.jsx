import { Box } from "@mui/material";
import ActiveTaskList from "./ActiveTaskList";
import TaskContainerHeader from "./TaskContainerHeader";

export default function TaskContainer() {

    return (
        <Box>
            <TaskContainerHeader />
            <ActiveTaskList />
        </Box>
    )
}