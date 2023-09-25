import { Divider } from "@mui/material";
import { useMemo } from "react";
import PropTypes from "prop-types";

export default function PaddedDivider({ padding = "3px", ...props }) {
    const style = useMemo(() => {
        return {
            paddingRight: padding,
            marginRight: padding
        };
    }, [padding]);

    return <Divider className="padded-divider" style={style} {...props} />;
}
PaddedDivider.propTypes = {
    padding: PropTypes.string,
};
