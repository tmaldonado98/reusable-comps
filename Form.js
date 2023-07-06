import * as React from 'react';
import {useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Forms.css';
// import { initializeApp } from 'firebase/app';   getAuth, 
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '@mui/material/Button';
import { initializeApp } from "firebase/app";
import {fbAuth, initFB} from './fbconfig';

// const firebaseApp = initializeApp(firebaseConfig);
// initFB;

// const auth = getAuth(firebaseApp);
const auth = fbAuth;

export default function Form (){
    const [showPassword, setShowPassword] = useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // User is signed in
          const user = userCredential.user;
          console.log(`Logged in as ${user.email}`);
        })
        .catch((error) => {
          // Handle login error
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`Login error: ${errorMessage}`);
        });
    };

    return (
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      // noValidate
      autoComplete="off"
    >
      <div>
        <label>Admin User</label>
        <TextField id="filled-basic adminname" placeholder="Admin User" variant="filled" />
        
      </div>

      <div>
        <label>Admin Password</label>
        <FilledInput
              id="filled-adornment-password adminpass"
              type={showPassword ? 'text' : 'password'}
              placeholder="Admin Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
      </div>
      <div className='buttons'>
          <Button className='button' variant="outlined" size="large">
            Login
          </Button>
        </div>
      </Box>
    )
}
