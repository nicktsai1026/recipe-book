import Link from 'next/link';

const Layer = ({ style }: { style: string }) => {
  return <div className={'opacity-50 absolute h-full w-full ' + style }></div>
}

export default function Home() {
  return (
    <div className="homepage-container">
      <div className='homepage-areas-section relative w-full h-screen bg-homepage-areas bg-cover'>
        <Layer style='bg-white' />
        <div className="w-4/5 absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className='text-5xl my-8'>Explore food from around the world</h1>
          <Link href="/areas" className='shadow-orange-100 bg-orange-400 rounded text-xl py-2 px-4 cursor-pointer hover:bg-secondary hover:text-white'>
            List of Cuisines
          </Link>
        </div>
      </div>
      <div className='homepage-categories-section relative w-full h-screen bg-homepage-categories bg-cover'>
        <Layer style='bg-black' />
        <div className="w-4/5 absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className='text-5xl my-8 text-white'>Inspiration for your next meal</h1>
          <Link href="/categories" className='shadow-orange-100 bg-secondary rounded text-xl text-white py-2 px-4 cursor-pointer hover:bg-orange-400 hover:text-black'>
            List of Categories
          </Link>
        </div>
      </div>
    </div>
  )
}
