"use client";

import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Link from "next/link";
import { useParams } from "next/navigation";
import { Kaushan_Script } from 'next/font/google'
const kaushan = Kaushan_Script({
  subsets: ['latin'],
  weight: '400'
});

const Header = () => {
  const { type: area, category, id: recipeId } = useParams();
  let route: string = "";
  if (recipeId) {
    route = area ? `/types/${area}/` : `/categories/${category}/`;
  } else {
    route = area ? `/types` : `/categories`;
  }
  const navLinkClass = "bg-orange-400 text-white hover:bg-orange-500 py-2 px-3 text-sm rounded font-bold flex items-center";
  
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
      <div>
        <Link href="/favorites">
          <h1 className={navLinkClass}>
            <FavoriteIcon className="mr-1" />
            My Favorites
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default Header