"use client";

import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Link from "next/link";
import AuthenticationForm from './AuthenticationForm';
import { useParams } from "next/navigation";
import { Kaushan_Script } from 'next/font/google';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const kaushan = Kaushan_Script({
  subsets: ['latin'],
  weight: '400'
});

const Header = () => {
  const { data: session } = useSession();
  const [openForm, setOpenForm] = useState(false);
  const { type: area, category, id: recipeId } = useParams();
  const navLinkClass = "bg-orange-400 text-white hover:bg-orange-500 py-2 px-3 text-sm rounded font-bold flex items-center cursor-pointer";
  const route: string = recipeId ? area ? `/areas/${area}` : `/categories/${category}` : category ? `/categories` : `/areas`;

  const FavoriteBtn = () => {
    return (
      <div className={navLinkClass}>
        <FavoriteIcon className="mr-1" /> Favorites
      </div>
    )
  }

  return (
    <div className="p-5 flex items-center justify-between bg-orange-100">
      { (area || category ) && 
        <Link href={route} className={navLinkClass}> 
          <NavigateBeforeIcon />
          {recipeId ? `${area || category} Recipes` : `Recipe ${area || category}`}
        </Link>
      }
      <div className={kaushan.className}>
        <Link href="/">
          <h1 className="text-primary font-bold text-4xl text-center">
            Recipe Book
          </h1>
        </Link>
      </div>
      <div className='user-section'>
        { session ? 
          <Link href="/favorites">
            <FavoriteBtn />
          </Link> :
          <div onClick={() => setOpenForm(true)}>
            <FavoriteBtn />
          </div>
        }
        <AuthenticationForm isOpen={openForm} setIsOpen={setOpenForm}/>
      </div>
    </div>
  )
}

export default Header