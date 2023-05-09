import * as React from 'react';
import '../../../scss/DialogCard.css'
import { TextField,InputLabel,DialogTitle,Dialog,DialogActions,DialogContent,MenuItem,FormControl,Select,Button } from '@mui/material';

const cityList = [
  {
    cityName: "Haldwani",
    cityId: 1
  },
  {
    cityName: "Kathgodam",
    cityId: 2
  },
]
export default function DialogCard({ open, handleClose, dispatch, addAddress, state }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Addess</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Enter your Address"
            type="text"
            fullWidth
            variant="standard"
            value={state.address}
            onChange={e => dispatch({ type: "ADDRESS", payload: e.target.value })}
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={state.city}
              onChange={e => dispatch({ type: "CITY", payload: e.target.value })}
              label="city"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cityList.map((itm) => <MenuItem key={itm.cityId} value={itm.cityName}>{itm.cityName}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="state"
            label="Enter your state"
            type="text"
            fullWidth
            variant="standard"
            value={state.state}
          // onChange={(e)=>dispatch({type:"STATE",payload:e.target.value}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pin"
            label="Enter PinCode"
            type="text"
            fullWidth
            value={state.zipcode}
            variant="standard"
            onChange={(e) => dispatch({ type: "ZIPCODE", payload: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addAddress}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}