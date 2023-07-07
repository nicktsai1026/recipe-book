import Image from "next/image";
import Link from "next/link";

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
              <Link href={`${route}/${recipe.idMeal}`}
                className="shadow-orange-700 bg-secondary text-white font-semibold rounded py-1 px-3 mt-5 block text-center hover:bg-orange-900" 
              >
                Get Recipe Details
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RecipeList