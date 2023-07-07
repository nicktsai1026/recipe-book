"use client";

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

  return (
    <div className="p-5 flex items-center justify-between bg-orange-100">
      { (area || category ) && 
        <Link href={route} 
          className="bg-orange-400 text-white p-4 text-sm rounded font-bold flex items-center"
        > 
          <svg className="w-4 h-4 text-white mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
          </svg>
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
          <h1 className="bg-orange-400 text-white hover:bg-secondary p-3 text-sm rounded font-bold items-center">
            My Favorites
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default Header