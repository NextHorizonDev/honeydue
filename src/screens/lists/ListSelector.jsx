import {
    Box,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Skeleton,
} from "@mui/material";
import useLists from "../../hooks/context/list/useLists";
import NoResults from "../../util/NoResults";
import AddListInput from "./AddListInput";
import ListSelectorRow from "./ListSelectorRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { ListStatus } from "../../classes/List";
import PropTypes from "prop-types";

export default function ListSelector() {
    const { isLoading, lists } = useLists();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const [showArchived, setShowArchived] = useState(false);

    return (
        <Box className="list-selector">
            <Box className="list-selector-header">
                <AddListInput />
                <Box className="action-menu" ref={menuRef}>
                    <IconButton onClick={() => setMenuOpen(true)}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </IconButton>
                </Box>
            </Box>
            <Box>
                {isLoading ? (
                    <EmptyListSelectorContent />
                ) : (
                    <ListSelectorContent
                        lists={lists}
                        showArchived={showArchived}
                    />
                )}
            </Box>
            {menuOpen && (
                <Menu
                    open={menuOpen}
                    anchorEl={menuRef.current}
                    onClose={() => setMenuOpen(false)}
                >
                    <MenuItem
                        onClick={() => {
                            setShowArchived((show) => !show);
                            setMenuOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faArchive} />
                        </ListItemIcon>
                        <ListItemText>
                            {showArchived ? "Hide" : "Show"} Archived
                        </ListItemText>
                    </MenuItem>
                </Menu>
            )}
        </Box>
    );
}

function EmptyListSelectorContent() {
    return (
        <Box>
            <Skeleton height={"50px"} />
            <Skeleton height={"50px"} />
            <Skeleton height={"50px"} />
            <Skeleton height={"50px"} />
            <Skeleton height={"50px"} />
        </Box>
    );
}

function ListSelectorContent({ lists = [], showArchived = false }) {
    return lists.length > 0 ? (
        lists.map((list) => {
            // Only render non-archived Lists (unless we are showing them all)
            if (list.status !== ListStatus.ARCHIVED || showArchived) {
                return <ListSelectorRow key={list.id} list={list} />;
            }
            return null;
        })
    ) : (
        <NoResults title={"No Lists"} />
    );
}
ListSelectorContent.propTypes = {
    lists: PropTypes.array,
    showArchived: PropTypes.bool,
};
