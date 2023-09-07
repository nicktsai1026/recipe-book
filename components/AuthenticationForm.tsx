'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import ForgotPasswordForm from './ForgotPasswordForm';
import { signIn } from 'next-auth/react';
import { Visibility, VisibilityOff, Close as CloseIcon } from '@mui/icons-material';
import { 
  Button, 
  Dialog,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText
} from '@mui/material';

const AuthenticationForm = ({
  isOpen,
  redirect,
  setIsOpen 
}: {
  isOpen: boolean,
  redirect: boolean,
  setIsOpen: (isOpen: boolean) => void
}) => {
  interface FormState {
    email: string,
    password: string
  };

  interface ErrorState {
    type: string,
    message: string
  };

  const [isRegister, setIsRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [formData, setFormData] = useState<FormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<ErrorState>({ type: '', message: '' });

  const linkStyle = "underline cursor-pointer hover:text-blue-800 mb-2";
  const router = useRouter();

  useEffect(() => {
    if(!isOpen) {
      setFormData({ email: '', password: '' });
      setIsRegister(false);
    }
  }, [isOpen]);

  const handleResetAndClose = () => {
    setIsOpen(false);
    setOpenForgotPassword(true);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const signupHandler = async () => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      console.log(response)
      const { error } = await response.json();
      setErrors({ type: error.type, message: error.message });
    } else {
      return await response.json();
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isRegister) {
      const data = await signupHandler();
      console.log(data);
      if (data) {
        handleSignIn();
      }
    } else {
      handleSignIn();
    }
  }

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password
    });

    if (result && result.error) {
      if (result.error == "Email") {
        setErrors({ type: "email", message: "User doesn't exits." });
      } 
      if (result.error == "Password") {
        setErrors({ type: "password", message: "Password is incorrect." });
      }
    } else {
      setIsOpen(false);
      if (redirect) {
        router.push('/favorites');
      }
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setIsValidEmail(validateEmail(value));
    }
    if (name === 'password') {
      setIsValidPassword(validatePassword(value));
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const validateEmail = (email: string) => {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const validatePassword = (password: string) => {
    return password.length >= 8;
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        keepMounted
      >
        <div className='relative pt-4 px-5 sm:px-10'>
          <div className='w-full flex justify-center'>
            <Image src="/favicon.ico" alt="logo" width={70} height={70} priority />
          </div>
          <div className='absolute top-2 right-2 sm:top-4 sm:right-4'>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <h2 className='text-center text-xl font-semibold px-5 sm:px-10 mt-1'>
          {isRegister ? 'Sign up' : 'Sign in'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='py-3 sm:py-8 px-5 sm:px-10'>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={errors.type == 'email'}
              helperText={errors.type == 'email' ? errors.message : ""}
            />
            <FormControl margin='normal' fullWidth variant="outlined" required>
              <InputLabel htmlFor="outlined-adornment-password" error={errors.type == 'password'}>Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(prev => !prev)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                error={errors.type == 'password'}
                inputProps={{
                  name: 'password',
                  value: formData.password,
                  onChange: handleChange
                }}
              />
              <FormHelperText error hidden={errors.type != 'password'}>{errors.message}</FormHelperText>
              <FormHelperText>Password must be at least 8 characters.</FormHelperText>
            </FormControl>
          </div>
          <div className='p-5 sm:p-10 sm:pt-0'>
            <Button type="submit" fullWidth variant="contained" className='bg-primary text-white hover:bg-orange-500'
              disabled={!isValidEmail || !isValidPassword}
            >
              {isRegister ? 'Sign up' : 'Sign in'}
            </Button>
            <div className='flex flex-col justify-between sm:items-center sm:flex-row text-sm text-blue-500 mt-4'>
              <span className={linkStyle} onClick={handleResetAndClose}>Forgot password?</span>
              <span onClick={() => setIsRegister(prev => !prev)} className={linkStyle}>
                {isRegister ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </span>
            </div>
          </div>
        </form>
      </Dialog>
      <ForgotPasswordForm 
        forgotPassword={openForgotPassword} 
        setForgotPassword={setOpenForgotPassword} 
        setIsOpen={setIsOpen}
      />
    </div>
  )
}

export default AuthenticationForm