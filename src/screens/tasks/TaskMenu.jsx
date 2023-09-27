import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import useTasks from "../../hooks/context/task/useTasks";

export default function TaskMenu() {

    const { showCompleted, setShowCompleted } = useTasks();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    return (
        <Box>
            <Box className="action-menu" ref={menuRef}>
                <IconButton onClick={() => setMenuOpen(true)}>
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
                            setShowCompleted((show) => !show);
                            setMenuOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={showCompleted ? faCheckSquare : faSquare } />
                        </ListItemIcon>
                        <ListItemText>
                            {showCompleted ? 'Hide' : 'Show'} Completed
                        </ListItemText>
                    </MenuItem>
                </Menu>
            )}
        </Box>
    );
}
