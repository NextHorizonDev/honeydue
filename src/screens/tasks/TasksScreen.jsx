import { Box, Divider } from "@mui/material";
import Screen from "../Screen";
import ListSelector from "../lists/ListSelector";
import ListProvider from "../../hooks/context/list/ListProvider";
import TaskContainer from "./TaskContainer";
import TaskProvider from "../../hooks/context/task/TaskProvider";

export default function TasksScreen() {
    return (
        <ListProvider>
            <TaskProvider>
                <Screen screenName="tasks">
                    <Box className="list-container">
                        <ListSelector />
                    </Box>
                    <Divider orientation="vertical" />
                    <Box className="task-container">
                        <TaskContainer />
                    </Box>
                </Screen>
            </TaskProvider>
        </ListProvider>
    );
}
