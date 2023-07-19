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

const ResetPassword = ({
  resetPassword, 
  setResetPassword,
  setIsOpen
}: {
  resetPassword: boolean;
  setResetPassword: (resetPassword: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}) => {

  const handleClose = () => {
    setResetPassword(false);
    setIsOpen(true);
  }

  return (
    <Dialog
      open={resetPassword}
      TransitionComponent={Transition}
      keepMounted
    >
      <div className='relative pt-4 px-10'>
        <h2 className='text-xl font-semibold px-10'>
          Forgot your password?
        </h2>
        <p>Enter your email address and we will send you a link to reset your password.</p>
        <div className='absolute top-4 right-4'>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
    </Dialog>
  )
}

export default ResetPassword