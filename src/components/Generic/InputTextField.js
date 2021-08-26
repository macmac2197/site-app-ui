import React from 'react'
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import Visibility  from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const InputTextField = (props) => {
    const {
        half,
        name, 
        label,
        handleOnChange,
        autoFocus,
        type,
        handleShowPassword
    } = props;

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                label={label}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    { type === 'password' ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    } : null }
            />
        </Grid>
    )
}

export default InputTextField
