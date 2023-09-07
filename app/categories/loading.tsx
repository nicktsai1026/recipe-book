import LinearProgress from '@mui/material/LinearProgress';

const loading = () => {
  return (
    <div className='w-full'>
      <LinearProgress color='warning' />
      <div className='w-4/5 absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <p className='text-center'>Loading Categories...</p>
      </div>
    </div>
  )
}

export default loading