import { Box } from "@mui/material";
import TaskSearch from "./TaskSearch";
import TaskMenu from "./TaskMenu";

export default function TaskContainerHeader() {
    return (
        <Box className='task-container-header'>
            <TaskSearch />
            <TaskMenu />
        </Box>
    );
}
