import React from "react";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import { makeStyles, Typography, withWidth } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
//import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    paddingRight: 50
  },
  submit: {
    marginTop: 20,
    width: 150
  },
  formGroup: {
    marginTop: 20
  },
  formControl: {
    //margin: theme.spacing(1),
    width: 300
  },
  input: {
    marginTop: 20
  }
}));

export default function DevItemForm(props) {
  const classes = useStyles();
  const [singleMulti, setSingleMulti] = React.useState("");
  const [multi, setMulti] = React.useState(false);

  const handleSelect = (event) => {
    setSingleMulti(event.target.value);
    if (event.target.value == "Multiple") setMulti(true);
    else setMulti(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h2">
        Add Items
      </Typography>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="singleMultiSelect">
          Single or Multiple Tokens
        </InputLabel>
        <Select
          labelId="singleMultiSelect"
          id="singleMultiSelect"
          value={singleMulti}
          onChange={handleSelect}
        >
          <MenuItem value={"Single"}>Single</MenuItem>
          <MenuItem value={"Multiple"}>Multiple</MenuItem>
        </Select>
      </FormControl>
      <FormGroup className={classes.formGroup}>
        <Input
          id="itemName"
          label="Item Name"
          placeholder="Item Name"
          className={classes.input}
        />
        <TextField
          id="itemDescription"
          label="Item Description"
          variant="outlined"
          multiline
          rows={4}
          placeholder="Item Description"
          className={classes.input}
        />
        <Button variant="outlined" color="default" className={classes.input}>
          Upload Image
          <Input
            type="file"
            // hidden
          />
        </Button>
        <Input
          id="itemPrice"
          label="Price"
          placeholder="Price"
          className={classes.input}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />

        {multi && (
          <Input
            id="numTokens"
            label="Number of Tokens"
            placeholder={100}
            className={classes.input}
            endAdornment={
              <InputAdornment position="end">Tokens</InputAdornment>
            }
          />
        )}
        <br />
        <ButtonGroup variant="contained" className={classes.submit}>
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button color="secondary">Cancel</Button>
        </ButtonGroup>
        <br />
      </FormGroup>
    </div>
  );
}
