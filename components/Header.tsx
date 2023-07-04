"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const Header = () => {
  const { type: area, id: recipeId } = useParams();

  return (
    <div className="p-5 bg-slate-300 flex items-center justify-between">
      <div>
        <Link href="/">
          <h1 className="text-blue-700 font-bold text-5xl text-center">
            Foode
          </h1>
        </Link>
      </div>
      { area && 
        <Link href={recipeId ? `/types/${area}/` : `/types`} 
          className="bg-blue-500 text-white p-4 text-xs rounded font-bold items-center"
        > 
          Back to {recipeId ? `${area} Recipes` : "Recipe Types"}
        </Link>
      }
    </div>
  )
}

export default Header