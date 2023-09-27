import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";

export default function TaskSearch() {
    return (
        <FormControl variant="outlined" size="small" fullWidth>
            <OutlinedInput
                placeholder="Search"
                endAdornment={
                    <InputAdornment position="end">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}
