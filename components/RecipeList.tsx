"use client";

import Image from "next/image";
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";

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
  const [favorites, setFavorites] = useState<string[]>([]);
  const favoriteHandler = (id: string) => {
    setFavorites((prev: string[]) => 
      prev.find(item => item === id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {recipes.map((recipe: Recipe, index: number) => {
        return (
          <div className="flex flex-col justify-between rounded bg-orange-200" key={index}>
            <Image 
              src={recipe.strMealThumb} 
              width={400} 
              height={400} 
              alt="Recipe Image"
              className="rounded-t"
            />
            <div className="flex flex-col justify-between p-5 h-full">
              <h2 className="text-2xl font-bold text-center">{recipe.strMeal}</h2>
              <div className="flex justify-between items-center mt-5">
                <Link href={`${route}/${recipe.idMeal}`}
                  className="shadow-orange-600 bg-orange-600 text-white font-semibold rounded py-1 px-3 block text-center hover:bg-orange-900" 
                >
                  Get Recipe Details
                </Link>
                <IconButton aria-label="favorite" color="error" onClick={() => favoriteHandler(recipe.idMeal)}>
                  {favorites.find(id => id === recipe.idMeal) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RecipeList