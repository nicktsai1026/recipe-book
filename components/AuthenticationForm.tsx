'use client';

import { useState } from 'react';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import ResetPassword from './ResetPassword';
import { 
  Button, 
  Dialog,
  TextField, 
  FormControlLabel, 
  Checkbox,
  IconButton
} from '@mui/material';
const AuthenticationForm = ({
  isOpen,
  setIsOpen 
}: {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
}) => {
  const [register, setRegister] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const handleResetAndClose = () => {
    setIsOpen(false);
    setResetPassword(true);
  }

  const handleSubmit = (event: any) => {
    console.log(event.target.name);
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        keepMounted
      >
        <div className='relative pt-4 px-10'>
          <div className='w-full flex justify-center'>
            <Image src="/favicon.ico" alt="logo" width={70} height={70} priority />
          </div>
          <div className='absolute top-4 right-4'>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <h2 className='text-center text-xl font-semibold px-10'>
          {register ? 'Sign up' : 'Sign in'}
        </h2>
        <div className='py-8 px-10'>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </div>
        <div className='p-10 pt-0'>
          <Button type="submit" fullWidth variant="contained" name={register ? 'register' : 'login'}
            className='bg-primary text-white hover:bg-orange-500' onClick={(event) => handleSubmit(event)}
          >
            {register ? 'Sign up' : 'Sign in'}
          </Button>
          <div className='flex justify-between items-center text-sm text-blue-500 mt-4'>
            <span className='cursor-pointer underline hover:text-blue-800' onClick={handleResetAndClose}>Forgot password?</span>
            <span onClick={() => setRegister(prev => !prev)} className='underline cursor-pointer hover:text-blue-800'>
              {register ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </span>
          </div>
        </div>
      </Dialog>
      <ResetPassword 
        resetPassword={resetPassword} 
        setResetPassword={setResetPassword} 
        setIsOpen={setIsOpen}
      />
    </div>
  )
}

export default AuthenticationForm