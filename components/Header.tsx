"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const Header = () => {
  const { type: area, id: recipeId } = useParams();

  return (
    <div className="p-5 flex items-center justify-between bg-orange-100">
      <div>
        <Link href="/">
          <h1 className="text-primary font-bold text-4xl text-center">
            Foode
          </h1>
        </Link>
      </div>
      { area && 
        <Link href={recipeId ? `/types/${area}/` : `/types`} 
          className="bg-secondary text-white p-4 text-xs rounded font-bold items-center"
        > 
          Back to {recipeId ? `${area} Recipes` : "Recipe Types"}
        </Link>
      }
    </div>
  )
}

export default Header