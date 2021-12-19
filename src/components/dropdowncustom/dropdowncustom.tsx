import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

console.log("*");

export default function MultipleSelectCheckmarks({
  title,
  names,
  personName,
  setPersonName,
}: any) {
  const [checkedAll, setCheckedAll] = React.useState(true);

  const handleChange = (event: any) => {
    if (event.target.value[event.target.value.length - 1] === undefined) {
      return;
    }
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSelectAll = () => {
    if (!checkedAll) {
      setPersonName(names);
    }
    if (checkedAll) {
      setPersonName([]);
    }

    setCheckedAll(!checkedAll);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          renderValue={(selected) => "any"}
          MenuProps={MenuProps}
        >
          <MenuItem onClick={handleSelectAll}>
            <Checkbox checked={checkedAll} />
            <ListItemText primary={"Select All"} />
          </MenuItem>
          {names.map((name: any) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                checked={personName?.indexOf(name) > -1}
                defaultChecked={true}
              />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
