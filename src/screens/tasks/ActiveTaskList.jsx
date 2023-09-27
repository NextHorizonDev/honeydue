import { isNil } from "lodash";
import useLists from "../../hooks/context/list/useLists";
import TaskList from "./TaskList";

export default function ActiveTaskList() {
    const {activeList} = useLists();

    return <TaskList listId={isNil(activeList) ? null : activeList.id} />
}