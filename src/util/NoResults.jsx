import { Box } from "@mui/material";
import { isNil } from "lodash";
import PropTypes from "prop-types";

export default function NoResults({ title = "No results", content = null }) {
    return (
        <Box className="no-results">
            <Box className="title">{title}</Box>
            {!isNil(content) && <Box className="content">{content}</Box>}
        </Box>
    );
}
NoResults.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object
};
