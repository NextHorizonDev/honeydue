import { Box } from "@mui/material";
import PropTypes from "prop-types";

/**
 * A generic Screen object
 * @param {Object} props
 * @param {[]Componenet} props.children
 * @param {string} props.string
 * @returns
 */
export default function Screen({ children = [], screenName = "" }) {
    return <Box className={`${screenName} screen`}>{children}</Box>;
}
Screen.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object),
    screenName: PropTypes.string,
};
