import { forwardRef } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  Slide, 
  TextField,
  IconButton
} from '@mui/material';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ForgotPasswordForm = ({
  forgotPassword, 
  setForgotPassword,
  setIsOpen
}: {
  forgotPassword: boolean;
  setForgotPassword: (forgotPassword: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}) => {

  const handleClose = () => {
    setForgotPassword(false);
    setIsOpen(true);
  }

  return (
    <Dialog
      open={forgotPassword}
      TransitionComponent={Transition}
      keepMounted
    >
      <div className='relative p-5 pb-0 sm:p-10 sm:pb-0'>
        <h2 className='text-xl font-semibold'>
          Forgot your password?
        </h2>
        <div className='absolute right-2 top-2 sm:top-4 sm:right-4'>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className='p-5 sm:p-10 text-gray-500'>
        <p>Enter your email address and we will send you a link to reset your password.</p>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
      </div>
      <div className='p-5 pt-0 sm:p-10 sm:pt-0'>
        <Button type="submit" fullWidth variant="contained" className='bg-primary text-white hover:bg-orange-500'>
          Reset Password
        </Button>
      </div>
    </Dialog>
  )
}

export default ForgotPasswordForm