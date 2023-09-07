"use client";

import Image from "next/image";
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";
import { useSession } from 'next-auth/react'
import AuthenticationForm from "./AuthenticationForm";

interface Recipe {
  strMeal: string,
  strMealThumb: string,
  idMeal: string
}

const RecipeList = ({
  recipes,
  route
}: {
  recipes: Recipe[],
  route: string
}) => {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const favoriteHandler = (id: string) => {
    console.log(session)
    if (!session) {
      setOpenForm(true);
    } else {
      setFavorites((prev: string[]) => 
        prev.find(item => item === id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {recipes.map((recipe: Recipe, index: number) => {
        return (
          <div className="flex flex-col justify-between rounded bg-orange-200" key={index}>
            <Image 
              src={recipe.strMealThumb} 
              width={640} 
              height={640} 
              alt="Recipe Image"
              className="rounded-t"
            />
            <div className="flex flex-col justify-between p-4 h-full">
              <h2 className="text-2xl font-bold text-center">{recipe.strMeal}</h2>
              <div className="grid grid-cols-6 gap-1 mt-5">
                <Link href={`${route}/${recipe.idMeal}`}
                  className="shadow-orange-600 col-span-5 bg-orange-600 text-white font-semibold rounded p-2 block text-center hover:bg-orange-900" 
                >
                  Get Recipe Details
                </Link>
                <div className="text-right">
                  <IconButton aria-label="favorite" color="error" onClick={() => favoriteHandler(recipe.idMeal)}>
                    {favorites.find(id => id === recipe.idMeal) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <AuthenticationForm isOpen={openForm} redirect={false} setIsOpen={setOpenForm}/>
    </div>
  )
}

export default RecipeList