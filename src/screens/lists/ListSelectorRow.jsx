import {
    faArchive,
    faEllipsisV,
    faPencil,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import useLists from "../../hooks/context/list/useLists";
import { ListStatus } from "../../classes/List";
import { isNil } from "lodash";

export default function ListSelectorRow({ list = null }) {
    const { deleteList, updateList, activeList, setActiveList } = useLists();

    const [isEditing, setIsEditing] = useState(false);
    const [editingName, setEditingName] = useState(list.name);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    /**
     * Change the status of the List between Archived/Active
     */
    const toggleArchive = () => {
        updateList({
            ...list,
            status:
                list.status === ListStatus.ARCHIVED
                    ? ListStatus.ACTIVE
                    : ListStatus.ARCHIVED,
        });
        setMenuOpen(false);
        setIsEditing(false);
    };

    /**
     * Update the List with the updated values
     */
    const saveUpdate = () => {
        updateList({
            ...list,
            name: editingName,
        });
        setMenuOpen(false);
        setIsEditing(false);
    };

    return (
        <Box
            className={`list-selector-row ${
                !isNil(activeList) && activeList.id === list.id && "active"
            } `}
            onClick={() => setActiveList(list)}
        >
            {isEditing ? (
                <ClickAwayListener
                    onClickAway={() => {
                        setMenuOpen(false);
                        setIsEditing(false);
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                saveUpdate();
                            }
                        }}
                    />
                </ClickAwayListener>
            ) : (
                <Box className="name">{list.name}</Box>
            )}
            {list.status === ListStatus.ARCHIVED && (
                <Box>
                    <FontAwesomeIcon icon={faArchive} />
                </Box>
            )}
            <Box className="action-menu" ref={menuRef}>
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(true);
                    }}
                >
                    <FontAwesomeIcon icon={faEllipsisV} />
                </IconButton>
            </Box>
            {menuOpen && (
                <Menu
                    open={menuOpen}
                    anchorEl={menuRef.current}
                    onClose={() => setMenuOpen(false)}
                >
                    <MenuItem
                        onClick={() => {
                            setIsEditing(true);
                            setMenuOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faPencil} />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            toggleArchive();
                            setMenuOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faArchive} />
                        </ListItemIcon>
                        <ListItemText>
                            {list.status === ListStatus.ARCHIVED
                                ? "Restore"
                                : "Archive"}
                        </ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => deleteList(list.id)}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
            )}
        </Box>
    );
}
ListSelectorRow.propTypes = {
    list: PropTypes.object,
};
